const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

/*
Mainnet	production network	https://mainnet.infura.io/WSwA9EEhk0xgVIeUqaDS
Ropsten	test network	https://ropsten.infura.io/WSwA9EEhk0xgVIeUqaDS
INFURAnet	test network	https://infuranet.infura.io/WSwA9EEhk0xgVIeUqaDS
Kovan	test network	https://kovan.infura.io/WSwA9EEhk0xgVIeUqaDS
Rinkeby	test network	https://rinkeby.infura.io/WSwA9EEhk0xgVIeUqaDS
IPFS	gateway	https://ipfs.infura.io
*/

const provider = new HDWalletProvider(
  'ancient boss pistol home ripple cruise diagram bachelor farm sphere sniff pull',
  'https://rinkeby.infura.io/WSwA9EEhk0xgVIeUqaDS'
);
const web3 = new Web3(provider);

/*
Attempting to deploy from account 0xDb1a796F201C74Ea29BFF459bcc72F4c69C7bb97
Contract deployed to 0x1f9E50F844a4de3c380A8711e8030137fb954aB9
*/

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Interface: ", interface)

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();
