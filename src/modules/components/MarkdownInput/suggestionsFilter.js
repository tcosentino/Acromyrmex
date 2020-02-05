// Get the first 5 suggestions that match
const size = list => (list.constructor.name === 'List' ? list.size : list.length);

const get = (obj, attr) => (obj.get ? obj.get(attr) : obj[attr]);

/**
 * Use this method to filter suggestions based on a search term. Right now just uses basic
 * string matching
 * @param {String} searchValue the value you want to match
 * @param {Array} suggestions the source list of suggestions to choose from
 */
const defaultSuggestionsFilter = (searchValue, suggestions) => {
  const value = searchValue.toLowerCase();
  const filteredSuggestions = suggestions.filter(
    suggestion =>
      !value ||
      get(suggestion, 'name')
        .toLowerCase()
        .indexOf(value) > -1
  );
  const length = size(filteredSuggestions);
  return filteredSuggestions.slice(0, length);
};

export default defaultSuggestionsFilter;
