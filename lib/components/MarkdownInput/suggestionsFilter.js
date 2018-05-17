'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Get the first 5 suggestions that match
var size = function size(list) {
  return list.constructor.name === 'List' ? list.size : list.length;
};

var get = function get(obj, attr) {
  return obj.get ? obj.get(attr) : obj[attr];
};

var defaultSuggestionsFilter = function defaultSuggestionsFilter(searchValue, suggestions) {
  var value = searchValue.toLowerCase();
  var filteredSuggestions = suggestions.filter(function (suggestion) {
    return !value || get(suggestion, 'name').toLowerCase().indexOf(value) > -1;
  });
  var length = size(filteredSuggestions);
  return filteredSuggestions.slice(0, length);
};

exports.default = defaultSuggestionsFilter;