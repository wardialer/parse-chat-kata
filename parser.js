const parseRegex = /^((\d{2}[:]\d{2}[:]\d{2}) (.+) : )(.+\n?)$/m;

function lineProcessor(string) {
  const parsed = string.match(parseRegex);

  return {
    mention: parsed[1],
    date: parsed[2],
    type: parsed[3].toLowerCase(),
    sentence: parsed[4],
  };
}

function dateSplitter(string) {
  const regexp = /(?<!^)(\d{2}:\d{2}:\d{2})/gm;
  return string.replace(regexp, '###$1');
}

function chatParser(string) {
  const lines = dateSplitter(string).split(/(?<=\n)|###/);
  const results = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    results.push(lineProcessor(line));
  }

  return results;
}


module.exports = chatParser;