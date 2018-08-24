// import { Map } from 'immutable';
import { convertToRaw, convertFromRaw } from 'draft-js';
import { stateFromMarkdown as rootStateFromMarkdown } from 'draft-js-import-markdown';

export default function stateFromMarkdown(
  markdown,
  mentions,
  mentionStateFromMarkdownFunctions = [],
) {
  const content = rootStateFromMarkdown(markdown);
  const raw = convertToRaw(content);

  let entityCount = Object.keys(raw.entityMap).length;

  raw.blocks.forEach((block) => {
    mentionStateFromMarkdownFunctions.forEach((func, index) => {
      entityCount += func(raw, entityCount, block, mentions[index] || []);
    });
  });

  // console.log(raw.entityMap);

  return convertFromRaw(raw);
}
