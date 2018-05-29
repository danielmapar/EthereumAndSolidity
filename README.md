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


  * Interacting with contracts
    * ![Calling Function](./images/call-func.png)
    * We call a function to mostly read contract data and not change it
    * We make a transaction to change a contracts data for the most part
      * Sending a transaction to a function cost some amount of `ether`
        * ![Calling Function](./images/units.png)
        * A `wei` is equal to `ether`
        * For every one dollar we have 100 cents
        * For 1 Ether we have 1,000,000,000,000,000 Wei (no wei fraction)
        * To convert `ether` units: https://etherconverter.online/


  * The gas system
    * Running code is not free
    * In order to get someone else to run our contracts, we have to pay them money (gas)
    * Every operation has a price (example: sum to operands)
      * https://docs.google.com/spreadsheets/d/1n6mRqkBz3iWcOlRem_mO09GtSKEKrAsfO7Frgx18pNU/edit#gid=0
      * ![Gas](./images/gas.png)
      * Whenever we issue a transaction that changes the blockchain in any fashion, we have to specify the amount of gas (wei) we are willing to pay to run that transaction
      * Some functions we wont be able to calculate the amount of gas necessary just by looking at the spreed sheet. Consequently, we specify a `gasLimit` to give us flexibility (estimate)
        * An example is a for-loop execution
        * `gasPrice`: I am paying 300 `wei` for gas unit
          * The default gas price is now 0.02 microether which is equivalent to:
            * 0.00000002 Ether (.02 * 1e-6)
            * 0.02e12 wei
            * 20000000000 wei
            * 20e9 wei
            * 20 Gwei (gigawei)
            * 0.02 szabo
        * `gasLimit`: I want to use at max 10 gas units to process this function
        * ![Gas Transaction](./images/gas-transaction.png)
          * If you don't have enough gas to run the function, it will stop mid way
          * ![Total Gas Cost](./images/total-gas-cost.png)
          * Operations that modify, or store data in the blockchain are gonna cost some amount of money


  * Mnemonic Phrases
    * ![Mnemonic Phrases](./images/mnemonic.png)
    * This will output private keys, public keys and accounts info.
      * Many accounts (Metamask is a good example)
      * https://iancoleman.io/bip39/: Convert mnemonic into public, private keys and addresses info
        * Metamask for instance will use this Derived Address table to create new accounts
        * ![Derived Address](./images/creating-new-accounts.png)


  * Lets get some Ether
    * faucet.rinkeby.io
