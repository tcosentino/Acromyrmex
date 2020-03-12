"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// Get the first 5 suggestions that match
var size = function size(list) {
  return list.constructor.name === 'List' ? list.size : list.length;
};

var get = function get(obj, attr) {
  return obj.get ? obj.get(attr) : obj[attr];
};
/**
 * Use this method to filter suggestions based on a search term. Right now just uses basic
 * string matching
 * @param {String} searchValue the value you want to match
 * @param {Array} suggestions the source list of suggestions to choose from
 */


var defaultSuggestionsFilter = function defaultSuggestionsFilter(searchValue, suggestions) {
  var value = searchValue.toLowerCase();
  var filteredSuggestions = suggestions.filter(function (suggestion) {
    return !value || get(suggestion, 'name').toLowerCase().indexOf(value) > -1;
  });
  var length = size(filteredSuggestions);
  return filteredSuggestions.slice(0, length);
};

var _default = defaultSuggestionsFilter;
exports["default"] = _default;