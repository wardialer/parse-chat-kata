const chatParser = require('../parser');

test('single sentence', () => {
  const input = '14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  const output = [{
    date: '14:24:32',
    mention: '14:24:32 Customer : ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: 'customer'
  }];

  expect(chatParser(input)).toEqual(output);
});

test('two sentences', () => {
  const input = [
    '14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    '14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.',
  ].join('\n');

  const output = [{
    date: '14:24:32',
    mention: '14:24:32 Customer : ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n',
    type: 'customer'
  }, {
    date: '14:26:15',
    mention: '14:26:15 Agent : ',
    sentence: 'Aliquam non cursus erat, ut blandit lectus.',
    type: 'agent'
  }]
  ;

  expect(chatParser(input)).toEqual(output);
});

test('two customer mentions as start', () => {
  const input = [
    '14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    '14:27:00 Customer : Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.',
    '14:27:47 Agent : Vestibulum tempor diam eu leo molestie eleifend.',
    '14:28:28 Customer : Contrary to popular belief, Lorem Ipsum is not simply random text.',
  ].join('\n');

  const output = [{
    date: '14:24:32',
    mention: '14:24:32 Customer : ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n',
    type: 'customer'
  }, {
    date: '14:27:00',
    mention: '14:27:00 Customer : ',
    sentence: 'Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.\n',
    type: 'customer'
  }, {
    date: '14:27:47',
    mention: '14:27:47 Agent : ',
    sentence: 'Vestibulum tempor diam eu leo molestie eleifend.\n',
    type: 'agent'
  }, {
    date: '14:28:28',
    mention: '14:28:28 Customer : ',
    sentence: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
    type: 'customer'
  }];

  expect(chatParser(input)).toEqual(output);
});

test('date splitting', () => {
  const input = [
    '14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.',
  ].join('\n');

  const output = [{
    date: '14:24:32',
    mention: '14:24:32 Customer : ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: 'customer'
  }, {
    date: '14:26:15',
    mention: '14:26:15 Agent : ',
    sentence: 'Aliquam non cursus erat, ut blandit lectus.',
    type: 'agent'
  }];

  expect(chatParser(input)).toEqual(output);
});

test('ignore extra dates', () => {
  const input = [
    '14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : I received it at 12:24:48, ut blandit lectus.',
  ].join('\n');

  const output = [{
    date: '14:24:32',
    mention: '14:24:32 Customer : ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: 'customer'
  }, {
    date: '14:26:15',
    mention: '14:26:15 Agent : ',
    sentence: 'I received it at 12:24:48, ut blandit lectus.',
    type: 'agent'
  }];

  expect(chatParser(input)).toEqual(output);
});

test('full name', () => {
  const input = [
    '14:24:32 Luca Galasso : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Emanuele Querzola : I received the package, ut blandit lectus.',
  ].join('\n');

  const output = [{
    date: '14:24:32',
    mention: '14:24:32 Luca Galasso : ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: 'customer'
  }, {
    date: '14:26:15',
    mention: '14:26:15 Emanuele Querzola : ',
    sentence: 'I received the package, ut blandit lectus.',
    type: 'agent'
  }]
  ;

  expect(chatParser(input)).toEqual(output);
});

test('missing colon after the names', () => {
  const input = [
    '14:24:32 Customer Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent I received it at 12:24:48, ut blandit lectus.',
  ].join('\n');

  const output = [{
    date: '14:24:32',
    mention: '14:24:32 Customer ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: 'customer'
  }, {
    date: '14:26:15',
    mention: '14:26:15 Agent ',
    sentence: 'I received it at 12:24:48, ut blandit lectus.',
    type: 'agent'
  }]
  ;

  expect(chatParser(input)).toEqual(output);
});