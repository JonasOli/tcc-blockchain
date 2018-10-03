function submitEditar() {
    var x = document.cookie;
    var instanciaAluno;

    App = {
        web3Provider: null,
        contracts: {},
        account: '0x0',

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
      
            return App.editaAluno();
          });
        },

        editaAluno: function() {
            App.contracts.Aluno.deployed().then(function(instance) {
                instanciaAluno = instance;
            }).then(function() {
                instanciaAluno.alunos(x).then(function(aluno) {
                    var id = aluno[0];
                    var nome = aluno[1];
                    var matricula = aluno[2];
                    var nota = aluno[3];
                    var situacao = aluno[4];
                    
                    console.log(id + nome + matricula + nota + situacao);
                    
                });
            }).catch(function(error) {
                console.warn(error);
            });
        }
    }
}