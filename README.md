# Ethereum And Solidity

## Introduction

* What is ethereum?

![Introduction](./images/what-is-ethereum.png)

* How can we connect to the network?
  * Developers: `web3.js`
  * Consumers
    * Metamask: Browser extension
    * Mist Browser: Full feature web browser


* Using Metamask
  * Generate an account (mnemonic)
  * You can host your local Ethereum network at local 8545
  * Custom RPC: Connect to a remote network using a custom address


* Metamask account:
  * Account address: shareable unique identifier (username)
  * Public key
  * Private key (both public and private is a like a password)
    * All those pieces of data are stores as hexadecimal numbers


* Sending tokens using Metamask:
  * http://rinkeby-faucet.com/
  ![Network](./images/networks.png)
  * What is a transaction?
    * `web3.js`: creates a transaction object
    * ![Transaction](./images/transaction.png)


* How is a blockchain block structured:
    * `nonce`: Basically a counter of transactions done using your account. So, lets say you have done 100 transactions already, that classed your next transaction with a `nonce` of 101
    * `v`, `r`, `s`: Sender generates those values with his private key (one way process). You cannot recalculate the private key
    * When some transactions get assembled inside a block:
    * ![Block](./images/block.png)
      * The node start running some calculations on the block, that is called Mining
      * Mining is the process of finding a hash  that starts with `0000` 4 0s (signed block).
      * ![Blockchain](./images/blockchain.png)


* Distributed Blockchain
  * We have many peers with copies of the blockchain. Consequently, if one of the peers changes some past block of his block chain, that will not match his neighbors blockchain.
  * Democracy wins, that means that if peer A is different from B and C (and those are equal), then A is incorrect

* Ethereum blockchain specifics
  * The ethereum hash does not need to start with 4 0s, it actually needs to be a hash that is less than a target value.
  * ![Hash](./images/hash.png)  
  * Block time: how long does it take to find a valid hash
  * For each block mined, the network will gather that data and calibrate the "difficulty target" for the next blocks
  * ![Target Block Time](./images/target-block-time.png)
    * This needs to be calibrated, since at any given time we may have a different number of available computers calculating those hashes.
  * https://etherscan.io/chart/blocktime: A website with a histogram of the average block time


## Smart Contracts

* An account controller by code
![Contract Account](./images/contract-account.png)

* External Account: The ones we create with Metamask and other apps (human beings accounts)
  * Those are also called External Accounts
  * ![External Account](./images/external-account.png)
  * Many networks


* Contract accounts
  * One network
  * ![Contract Account](./images/contract-accounts.png)
  * Contract Source is like a class
  * Contract Instance is like an instance of a class
    * Each instance of that class will be deployed to a network

* Solidity Programming Languages
  * ![Solidity](./images/solidity.png)
  * ![Solidity Definition](./images/solidity-definition.png)
  * ![ABI](./images/abi.png)
  * Lets write our first Solidity Contract (remix.ethereum.org

```
pragma solidity ^0.4.17; // Version of solidity we are using

contract Inbox {
    string public message; // storage variable that is carried with the contract

    constructor(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }

    // Not necessary, since messsage is a public property
    function getMessage() public view returns (string) {
        return message;
    }
}
```

  * ![Function Types](./images/function-types.png)
    * `public`: Anyone with an Ethereum account can call it inside our contract
  * Remix has a tine fake network to test our Contracts (Javascript VM)
    * ![Remix](./images/remix.png)

    * ![Create Transaction](./images/transaction2.png)
      * If we leave the `to` field as blank, the transaction will be turned into a contracted inside the network
      * `data`: the compiled code of the contract (open code)
      * `value`: We can send some initial amount of money with this contract
