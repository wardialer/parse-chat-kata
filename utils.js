function separeStrings(string, separator) {
  const newLineRegex = new RegExp(/(?<=\n)/);
  const dateSplittingRegex = new RegExp(/(?<!^|[^\S])((?:[0-9]{2}:?){3})/);

  const regex = new RegExp(`${newLineRegex.source}|${dateSplittingRegex.source}`, 'gm');
  return string.replace(regex, `${separator}$1`);
}

function trimmer(string) {
  return string.replace(/[^a-zA-Z]/g, '');
}

function authorChecker(first, second) {
  const firstAuthor = trimmer(first.mention);
  const secondAuthor = trimmer(second.mention);

  return (firstAuthor === secondAuthor);
}

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
