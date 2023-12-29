const TokenObjectRegexp = /\{{(.+?)\}}/gi;
const TokenArrayRegexp = /\{(\d+)\}/gi;

/**
 * Replace tokens in string by providing a record.
 * @param {string} text - A string containing tokens to replace
 * @param {object} [tokens] - An optional record of key/value pairs.
 * @example replaceStringTokens("There are {itemsLeft} items left out of {totalItems}.", { itemsLeft: 3, totalItems: 10 })
 */
export const replaceStringTokens = (text, tokens = {}) =>
  text?.replace(TokenObjectRegexp, (_, captureGroup) => tokens[captureGroup.toLowerCase()] || '') ||
  '';

/**
 * Replace tokens in string by providing an array of values.
 * @param {string} text - A string containing tokens to replace
 * @example replaceStringTokensByArray("There are {0} items left out of {1}.", [3, 10])
 * */
export const replaceStringTokensByArray = (text, tokenArray = []) =>
  text?.replace(
    TokenArrayRegexp,
    (_, captureGroup) => tokenArray[parseInt(captureGroup, 10)] || '',
  ) || '';
