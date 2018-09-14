var Aluno = artifacts.require("./Aluno.sol");

module.exports = function(deployer) {
  deployer.deploy(Aluno);
};
