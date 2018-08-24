'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stateFromMarkdown;

var _draftJs = require('draft-js');

var _draftJsImportMarkdown = require('draft-js-import-markdown');

// import { Map } from 'immutable';
function stateFromMarkdown(markdown, mentions) {
  var mentionStateFromMarkdownFunctions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var content = (0, _draftJsImportMarkdown.stateFromMarkdown)(markdown);
  var raw = (0, _draftJs.convertToRaw)(content);

  var entityCount = Object.keys(raw.entityMap).length;

  raw.blocks.forEach(function (block) {
    mentionStateFromMarkdownFunctions.forEach(function (func, index) {
      entityCount += func(raw, entityCount, block, mentions[index] || []);
    });
  });

  // console.log(raw.entityMap);

  return (0, _draftJs.convertFromRaw)(raw);
}