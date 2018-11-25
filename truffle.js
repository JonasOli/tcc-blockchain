var HDWalletProvider = require("truffle-hdwallet-provider");

var infuraAPIKey = "a6bc10219ba2409a8f7dc68a498b7a64"
var mnemonic = "bench ridge icon space engage gather ride cash human travel expire budget"

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  solc: {
    optimazer: {
      enable: true,
      runs: 200
    }
  },
  networks: {
    development: {
      host: "192.168.0.12",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infuraAPIKey)
      },
      network_id: 3
    }
  }
};
