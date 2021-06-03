const { separeStrings, defineType } = require('./utils');

const parseRegex = /^(((?:[0-9]{2}:?){3}) (?:.+ : |\b\w+\b ))(.+\n?)$/m;

function lineProcessor(string) {
  const parsed = string.match(parseRegex);

  return {
    mention: parsed[1],
    date: parsed[2],
    sentence: parsed[3],
  };
}

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
