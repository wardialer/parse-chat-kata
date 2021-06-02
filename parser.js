const parseRegex = /^((\d{2}[:]\d{2}[:]\d{2}) (?:(.+) : |(\b\w+\b )))(.+\n?)$/m;

function lineProcessor(string) {
  const parsed = string.match(parseRegex);

  return {
    mention: parsed[1],
    date: parsed[2],
    sentence: parsed[5] || parsed[4],
  };
}

function markSeparators(string) {
  const regex = /(?<=\n)|(?<!^|[^\S])(\d{2}:\d{2}:\d{2})/gm;
  return string.replace(regex, '#separator#$1');
}

function typeDefiner(messages) {
  const regex = /([a-zA-Z]+)/g;
  const customerName = messages[0].mention.match(regex)[0];

  messages.map((message) => {
    message.type = message.mention.includes(customerName) ? 'customer' : 'agent';
  });

  return messages;
} 

function chatParser(string) {
  const lines = markSeparators(string).split('#separator#');
  const results = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    results.push(lineProcessor(line));
  }

  return typeDefiner(results);
}


module.exports = chatParser;