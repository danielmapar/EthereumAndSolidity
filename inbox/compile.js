const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

// solc.compile(input, numberOfContracts)
const compiled = solc.compile(source, 1);

module.exports = compiled.contracts[':Inbox'];
