// From https://github.com/sstur/draft-js-utils/blob/master/packages/draft-js-export-markdown/src/stateToMarkdown.js
// adapted to support mentions as well
import { getEntityRanges, BLOCK_TYPE, ENTITY_TYPE, INLINE_STYLE } from 'draft-js-utils';

const { BOLD, CODE, ITALIC, STRIKETHROUGH, UNDERLINE } = INLINE_STYLE;

function canHaveDepth(blockType) {
  switch (blockType) {
    case BLOCK_TYPE.UNORDERED_LIST_ITEM:
    case BLOCK_TYPE.ORDERED_LIST_ITEM:
      return true;
    default:
      return false;
  }
}

function encodeContent(text) {
  return text.replace(/[*_`]/g, '\\$&');
}

// Encode chars that would normally be allowed in a URL but would conflict with
// our markdown syntax: `[foo](http://foo/)`
function encodeURL(url) {
  return url.replace(/\)/g, '%29');
}

// Escape quotes using backslash.
function escapeTitle(text) {
  return text.replace(/"/g, '\\"');
}

class MarkupGenerator {
  // blocks: Array<ContentBlock>;
  // contentState: ContentState;
  // currentBlock: number;
  // output: Array<string>;
  // totalBlocks: number;
  // listItemCounts: Object;

  constructor(contentState, mentionStateToMarkdownFunctions) {
    this.contentState = contentState;
    this.mentionStateToMarkdownFunctions = mentionStateToMarkdownFunctions;
  }

  generate() {
    this.output = [];
    this.blocks = this.contentState.getBlockMap().toArray();
    this.totalBlocks = this.blocks.length;
    this.currentBlock = 0;
    this.listItemCounts = {};
    while (this.currentBlock < this.totalBlocks) {
      this.processBlock();
    }
    const joined = this.output.join('');
    return joined.substring(0, joined.length - 1);
  }

  processBlock() {
    const block = this.blocks[this.currentBlock];
    const blockText = block.getText();

    this.insertLineBreaks(1);

    if (blockText === '') {
      // Prevent element collapse if completely empty.
      // TODO: Replace with constant.
      this.output.push('\u200B');
      return;
    }

    this.output.push(`${blockText}\n`);

    this.currentBlock += 1;
  }

  getLastBlock() {
    return this.blocks[this.currentBlock - 1];
  }

  getNextBlock() {
    return this.blocks[this.currentBlock + 1];
  }

  getListItemCount(block) {
    const blockType = block.getType();
    const blockDepth = block.getDepth();
    // To decide if we need to start over we need to backtrack (skipping list
    // items that are of greater depth)
    let index = this.currentBlock - 1;
    let prevBlock = this.blocks[index];
    while (prevBlock && canHaveDepth(prevBlock.getType()) && prevBlock.getDepth() > blockDepth) {
      index -= 1;
      prevBlock = this.blocks[index];
    }
    if (!prevBlock || prevBlock.getType() !== blockType || prevBlock.getDepth() !== blockDepth) {
      this.listItemCounts[blockDepth] = 0;
    }
    // eslint-disable-next-line
    return (this.listItemCounts[blockDepth] = this.listItemCounts[blockDepth] + 1);
  }

  insertLineBreaks() {
    if (this.currentBlock > 0) {
      this.output.push('\n');
    }
  }

  renderBlockContent(block) {
    const { contentState } = this;
    const blockType = block.getType();
    const blockText = block.getText();

    if (blockText === '') {
      // Prevent element collapse if completely empty.
      // TODO: Replace with constant.
      return '\u200B';
    }
    const charMetaList = block.getCharacterList();
    const entityPieces = getEntityRanges(blockText, charMetaList);

    return entityPieces
      .map(([entityKey, stylePieces]) => {
        const finalContent = stylePieces
          .map(([text, style]) => {
            // Don't allow empty inline elements.
            if (!text) {
              return '';
            }
            let content = encodeContent(text);
            if (style.has(BOLD)) {
              content = `**${content}**`;
            }
            if (style.has(UNDERLINE)) {
              // TODO: encode `+`?
              content = `++${content}++`;
            }
            if (style.has(ITALIC)) {
              content = `_${content}_`;
            }
            if (style.has(STRIKETHROUGH)) {
              // TODO: encode `~`?
              content = `~~${content}~~`;
            }
            if (style.has(CODE)) {
              content = blockType === BLOCK_TYPE.CODE ? content : `\`${content}\``;
            }
            return content;
          })
          .join('');
        const entity = entityKey ? contentState.getEntity(entityKey) : null;

        if (entity != null && entity.getType() === ENTITY_TYPE.LINK) {
          const data = entity.getData();
          const url = data.url || '';
          const title = data.title ? ` "${escapeTitle(data.title)}"` : '';
          return `[${finalContent}](${encodeURL(url)}${title})`;
        } else if (entity != null && entity.getType() === ENTITY_TYPE.IMAGE) {
          const data = entity.getData();
          const src = data.src || '';
          const alt = data.alt ? `${escapeTitle(data.alt)}` : '';
          return `![${alt}](${encodeURL(src)})`;
        } else if (entity != null) {
          // mentions
          let returnVal = false;

          this.mentionStateToMarkdownFunctions.forEach((func) => {
            const result = func(entity);
            if (result) {
              returnVal = result;
            }
          });

          if (returnVal) {
            return returnVal;
          }
        }
        return finalContent;
      })
      .join('');
  }
}

export default function stateToMarkdown(content, mentionStateToMarkdownFunctions) {
  return new MarkupGenerator(content, mentionStateToMarkdownFunctions).generate();
}
