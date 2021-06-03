/**
 * Adds separators to a string, indicating newlines.
 * Useful to split a unique string into several lines without losing the original separators.
 * @function
 * @param {String} string - The input string to mark
 * @param {String} separator - The char(s) to be used as a separator
 * @returns {String} The string ready to be splitted
 */
function separeStrings(string, separator) {
  // Marks a string to be splitted over newlines (most common case)
  const newLineRegex = new RegExp(/(?<=\n)/);
  // Marks a string to be splitted over the date if no newlines are present
  const dateSplittingRegex = new RegExp(/(?<!^|[^\S])((?:[0-9]{2}:?){3})/);

  const regex = new RegExp(`${newLineRegex.source}|${dateSplittingRegex.source}`, 'gm');
  return string.replace(regex, `${separator}$1`);
}

/**
 * Removes non-alphabetic chars from string.
 * Useful to extract a username from a mention.
 * @function
 * @param {String} string - The input string (usually a mention)
 * @returns {String} The string cleaned up from non-alphabetic chars
 */
function trimmer(string) {
  return string.replace(/[^a-zA-Z]/g, '');
}

/**
 * Checks if two messages have the same author.
 * Useful to identify the type (customer/agent) of the message.
 * @function
 * @param {String} first - The first message to compare
 * @param {String} second - The second message to compare
 * @returns {Boolean} True if the two messages have the same author, False otherwise
 */
function authorChecker(first, second) {
  const firstAuthor = trimmer(first.mention);
  const secondAuthor = trimmer(second.mention);

  return (firstAuthor === secondAuthor);
}

/**
 * Defines the type of a message by comparing it with the first message in an array.
 * Useful as callback for the Array.map() method.
 * @function
 * @param {Object} message - The element being processed in the array
 * @param {Number} index - The index of the current element being processed in the array
 * @param {Array} array - The array map was called upon
 * @returns {Object} A new message object with the type field properly defined
 */
function defineType(message, index, array) {
  return {
    mention: message.mention,
    date: message.date,
    sentence: message.sentence,
    type: authorChecker(array[0], message) ? 'customer' : 'agent',
  };
}

module.exports = {
  separeStrings,
  defineType,
};
