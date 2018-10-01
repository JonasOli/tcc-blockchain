App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Aluno.json", function(aluno) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Aluno = TruffleContract(aluno);
      // Connect provider to interact with contract
      App.contracts.Aluno.setProvider(App.web3Provider);

      //App.listenForEvents();

      return App.render();
    });
  },

  /*// Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.Aluno.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.votedEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new vote is recorded
        App.render();
      });
    });
  },*/

  render: function() {
    var alunoInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Aluno.deployed().then(function(instance) {
      alunoInstance = instance;
      return alunoInstance.contAlunos();
    }).then(function(contAlunos) {
      var alunosTabela = $("#alunosTabela");
      alunosTabela.empty();

      //var candidatesSelect = $('#candidatesSelect');
      //candidatesSelect.empty();

      for (var i = 1; i <= contAlunos; i++) {
        alunoInstance.alunos(i).then(function(aluno) {
          var id = aluno[0];
          var nome = aluno[1];
          var matricula = aluno[2];
          var nota = aluno[3];
          var situacao = aluno[4];

          // Render candidate Result
          var templateAlunos = "<tr><th>" + id + "</th><td>" + nome + "</td><td>" + matricula 
          + "</td><td>" + nota + "</td><td>" + situacao + "</td><td> <button type='button' id='" + id 
          + "' class='editar' onclick='Editar(" + id + ")'>Editar</button> </td></tr>";
          alunosTabela.append(templateAlunos);

          // Render candidate ballot option
          //var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
          //candidatesSelect.append(candidateOption);
        });
      }
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  }
};

function Editar(id) {
  document.location = 'editar.html';
}

$(function() {
  $(window).load(function() {
    App.init();
  });
});