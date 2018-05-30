const assert = require('assert');
const ganache = require('ganache-cli'); // to generate a test network
const Web3 = require('web3'); // to interface with the network
// We need to set a provider to manage the communication
// The provider has some default methods. Also, the provider will change depending on the network that we want to connect to
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

// Ganache will automatically generate some accounts for us as soon as the network bootsup
// Those are created on an `unlocked` state, that means that we dont need to mess with private/public keys

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy
  // the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    // instruct web3 that you want to deploy a contract
    .deploy({
      data: bytecode,
      arguments: ['Hi there!'] // To be passed by the contract constructor
    })
    .send({ from: accounts[0], gas: '1000000' }); // sends out a transaction that creates the contract

  inbox.setProvider(provider);
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });

  it('can change the message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] }); // send transaction (we will change contract data)
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });
});
