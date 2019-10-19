// import { Map } from 'immutable';
import { convertToRaw, convertFromRaw } from 'draft-js';
import { stateFromMarkdown as rootStateFromMarkdown } from 'draft-js-import-markdown';

export default function stateFromMarkdown(
  markdown,
  mentions,
  mentionStateFromMarkdownFunctions = []
) {
  // console.log({ markdown });
  const content = rootStateFromMarkdown(markdown);
  // console.log({ content });
  const raw = convertToRaw(content);
  // console.log({ raw });

  let entityCount = Object.keys(raw.entityMap).length;

  raw.blocks.forEach(block => {
    let tempText = block.text;
    mentionStateFromMarkdownFunctions.forEach((func, index) => {
      const { entityCount: newEntityCount, tempText: newTempText } = func(
        raw,
        entityCount,
        block,
        mentions[index] || [],
        tempText
      );
      entityCount = newEntityCount;
      tempText = newTempText;
    });
  });

  // console.log(raw.entityMap);

  return convertFromRaw(raw);
}
