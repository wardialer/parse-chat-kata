# Parse Chat Kata

## Install the dependencies
```
npm install
```

## Development


### Linting:
```
npm run lint
```
or
```
npm run lint:fix
```
for auto-fixing errors


### Testing:

```
npm run test
```
or
```
npm run test:watch
```
for repeating tests automatically on save (useful for TDD)


### Generate documentation:
```
npm run generate-docs
```
(documentation will be generated in 'docs' folder)


## Usage
```
const parser = require('path/to/index');
const results = parser('input-string-to-be-processed');
```

The parser throws an error when unable to correctly parse the input string.

It is possible to indicate specific characters sequences to be used as separation marks via the SEPARATOR environment variable.
The default sequence is `#-#-#`. 

