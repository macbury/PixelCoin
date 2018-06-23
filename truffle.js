// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '5777' // Match any network id
    },

    staging: {
      from: '0xbdb19f46b7f419bdcf1047cd20e0f82b7d4a57d2',
      host: "localhost",
      port: 8545,
      network_id: "4", // Rinkeby ID 4
      from: "0x99a4572656eb49FFEEFbe9588f8e7ab0F8D6Eb5e", // account from which to deploy
      gas: 6712390
    }

    test: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*' // Match any network id
    }
  }
}
