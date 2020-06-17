"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = stateFromMarkdown;

var _draftJs = require("draft-js");

var _draftJsImportMarkdown = require("draft-js-import-markdown");

// import { Map } from 'immutable';
function stateFromMarkdown(markdown, mentions) {
  var mentionStateFromMarkdownFunctions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  // console.log({ markdown });
  var content = (0, _draftJsImportMarkdown.stateFromMarkdown)(markdown); // console.log({ content });

  var raw = (0, _draftJs.convertToRaw)(content); // console.log({ raw });

  var entityCount = Object.keys(raw.entityMap).length;
  raw.blocks.forEach(function (block) {
    var tempText = block.text;
    mentionStateFromMarkdownFunctions.forEach(function (func, index) {
      console.log({
        tempText: tempText,
        mentions: mentions
      });

      var _func = func(raw, entityCount, block, mentions[index] || [], tempText),
          newEntityCount = _func.entityCount,
          newTempText = _func.tempText;

      entityCount = newEntityCount;
      tempText = newTempText;
    });
  }); // console.log(raw.entityMap);

  return (0, _draftJs.convertFromRaw)(raw);
}