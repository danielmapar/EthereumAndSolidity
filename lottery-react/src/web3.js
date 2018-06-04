import Web3 from 'web3';

// We use the provider from metamask, but we actually run web3 1.0
// instead of the gloabally available version 0.20
// Some provider must be installed (metamask), otherwise the app will fail during runtime
const web3 = new Web3(window.web3.currentProvider);

export default web3;
