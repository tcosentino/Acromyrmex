'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stateFromMarkdown;

var _immutable = require('immutable');

var _draftJs = require('draft-js');

var _draftJsImportMarkdown = require('draft-js-import-markdown');

var TEMPLATE_REGEX = /{(\S*-*)([0-9a-zA-Z-]+)}/g;

function stateFromMarkdown(markdown, mentions) {
  var content = (0, _draftJsImportMarkdown.stateFromMarkdown)(markdown);
  var raw = (0, _draftJs.convertToRaw)(content);

  var entityCount = Object.keys(raw.entityMap).length;

  raw.blocks.forEach(function (block) {
    var text = block.text;
    // Loop over the matches
    block.text = text.replace(TEMPLATE_REGEX, function (match, p1, p2, offset) {
      var matchingOption = mentions.find(function (m) {
        return m.textValue === match;
      });
      if (!matchingOption) {
        return match;
      }

      var entityRange = {
        offset: offset,
        length: matchingOption.name.length,
        key: entityCount
      };

      block.entityRanges.push(entityRange);
      raw.entityMap['' + entityCount] = {
        type: '{mention',
        mutability: 'IMMUTABLE',
        data: {
          mention: (0, _immutable.Map)(matchingOption)
        }
      };

      entityCount += 1;

      // we actually don't want to change anything, just looping
      return matchingOption.name;
    });
  });

  return (0, _draftJs.convertFromRaw)(raw);
}