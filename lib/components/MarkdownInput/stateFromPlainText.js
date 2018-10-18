'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stateFromMarkdown;

var _draftJs = require('draft-js');

function stateFromMarkdown(markdown, mentions) {
  var mentionStateFromMarkdownFunctions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  console.log({ markdown: markdown });
  var content = _draftJs.ContentState.createFromText(markdown);
  var raw = (0, _draftJs.convertToRaw)(content);

  var entityCount = Object.keys(raw.entityMap).length;

  console.log({ raw: raw });

  raw.blocks.forEach(function (block) {
    var tempText = block.text;
    mentionStateFromMarkdownFunctions.forEach(function (func, index) {
      var _func = func(raw, entityCount, block, mentions[index] || [], tempText),
          newEntityCount = _func.entityCount,
          newTempText = _func.tempText;

      entityCount = newEntityCount;
      tempText = newTempText;
    });
  });

  // console.log(raw.entityMap);

  return (0, _draftJs.convertFromRaw)(raw);
} // import { Map } from 'immutable';