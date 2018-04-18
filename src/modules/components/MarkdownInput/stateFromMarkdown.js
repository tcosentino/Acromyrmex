import { Map } from "immutable";
import { convertToRaw, convertFromRaw } from "draft-js";
import { stateFromMarkdown as rootStateFromMarkdown } from "draft-js-import-markdown";
const TEMPLATE_REGEX = /{(\S*-*)([0-9a-zA-Z-]+)}/g;

export default function stateFromMarkdown(markdown, mentions) {
  const content = rootStateFromMarkdown(markdown);
  const raw = convertToRaw(content);
  console.log(raw);
  let entityCount = Object.keys(raw.entityMap).length;

  raw.blocks.forEach(block => {
    const text = block.text;
    // Loop over the matches
    block.text = text.replace(TEMPLATE_REGEX, (match, p1, p2, offset) => {
      const matchingOption = mentions.find(m => m.value === match);
      if (!matchingOption) {
        return match;
      }

      const entityRange = {
        offset,
        length: matchingOption.name.length,
        key: entityCount
      };

      block.entityRanges.push(entityRange);
      raw.entityMap[`${entityCount}`] = {
        type: "{mention",
        mutability: "IMMUTABLE",
        data: {
          mention: Map(matchingOption)
        }
      };

      entityCount += 1;

      // we actually don't want to change anything, just looping
      return matchingOption.name;
    });
  });

  return convertFromRaw(raw);
}
