const { separeStrings, defineType } = require('./utils');

const parseRegex = /^(((?:[0-9]{2}:?){3}) (?:.+ : |\b\w+\b ))(.+\n?)$/m;

/**
 * Processes a single line of the chat.
 * @function
 * @param {String} string - The input string representing the chat message to process
 * @returns {Object} JSON output based on the input string, containing mention, date, and sentence
 */
function lineProcessor(string) {
  const parsed = string.match(parseRegex);

  return {
    mention: parsed[1], // 1st capture group
    date: parsed[2], // 2nd capture group
    sentence: parsed[3], // 3rd capture group
  };
}

/**
 * Processes a chat string according to the defined rules.
 * Each string is splitted in separate lines and then each line is converted into a JSON
 * with mention, date, sentence, and type as key.
 * @function
 * @param {String} string - The input string to process
 * @returns {Array} An array of JSON data with the required fields
 */
function chatParser(string) {
  const separator = process.env.SEPARATOR || '#-#-#';
  const lines = separeStrings(string, separator).split(separator);

  const results = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    results.push(lineProcessor(line));
  }

  return results.map(defineType);
}

module.exports = chatParser;
