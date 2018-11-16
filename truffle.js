module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "10.201.12.111",
      port: 7545,
      network_id: "*" // Match any network id
    }
  }
};
