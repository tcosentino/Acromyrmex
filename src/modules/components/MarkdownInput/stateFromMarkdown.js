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

  const entityCount = Object.keys(raw.entityMap).length;

  raw.blocks.forEach((block) => {
    mentionStateFromMarkdownFunctions.forEach((func) => {
      func(raw, entityCount, block, mentions);
    });
  });

  // console.log(raw.entityMap);

  return convertFromRaw(raw);
}
