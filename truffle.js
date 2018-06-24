// Allows us to use ES6 in our migrations and tests.
require('babel-register')
var HDWalletProvider = require("truffle-hdwallet-provider");
var config = require('truffle.local.js')
module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '5777' // Match any network id
    },

    staging: {
      provider: function() {
        return new HDWalletProvider(config.mnemonic, "https://rinkeby.infura.io/" + config.infuraApiKey)
      },
      network_id: "4", // Rinkeby ID 4
      //gas: 4612388,
    },

    test: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*' // Match any network id
    }
  }
}
