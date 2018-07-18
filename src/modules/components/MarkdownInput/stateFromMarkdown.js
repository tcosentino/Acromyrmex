import { Map } from 'immutable';
import { convertToRaw, convertFromRaw } from 'draft-js';
import { stateFromMarkdown as rootStateFromMarkdown } from 'draft-js-import-markdown';

const TEMPLATE_REGEX = /{(\S*-*)([0-9a-zA-Z-]+)}/g;

export default function stateFromMarkdown(markdown, mentions) {
  const content = rootStateFromMarkdown(markdown);
  const raw = convertToRaw(content);

  let entityCount = Object.keys(raw.entityMap).length;

  raw.blocks.forEach((block) => {
    const text = block.text;
    let tempText = block.text;
    // Loop over the matches
    block.text = text.replace(TEMPLATE_REGEX, (match) => {
      const matchingOption = mentions.find(m => m.textValue === match);
      if (!matchingOption) {
        return match;
      }

      console.log(matchingOption);

      const entityRange = {
        offset: tempText.indexOf(match),
        length: matchingOption.name.length,
        key: entityCount,
      };

      block.entityRanges.push(entityRange);
      raw.entityMap[`${entityCount}`] = {
        type: '{mention',
        mutability: 'IMMUTABLE',
        data: {
          mention: Map(matchingOption),
        },
      };

      entityCount += 1;

      // we want to follow along to calculate offsets
      tempText = tempText.replace(match, matchingOption.name);

      // we actually don't want to change anything, just looping
      return matchingOption.name;
    });
  });

  // console.log(raw.entityMap);

  return convertFromRaw(raw);
}
