const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

/*
Attempting to deploy from account 0xDb1a796F201C74Ea29BFF459bcc72F4c69C7bb97
Contract deployed to 0xdb27c2E7e79faEF83245a654FF5b979d297d6A02
*/
const provider = new HDWalletProvider(
  'ancient boss pistol home ripple cruise diagram bachelor farm sphere sniff pull',
  'https://rinkeby.infura.io/WSwA9EEhk0xgVIeUqaDS'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();
