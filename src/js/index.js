Web3 = require('web3');

if (typeof web3 !== 'undefined') {
    // If a web3 instance is already provided by Meta Mask.
    web3 = new Web3(web3.currentProvider);
} else {
    // Specify default instance if no web3 instance provided
    web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io'));
}

// console.log(web3.isConnected());
// console.log(web3.eth.accounts[0]);

abi = JSON.parse('[{"constant":false,"inputs":[{"name":"_nome","type":"string"},{"name":"_matricula","type":"string"},{"name":"_nota","type":"string"},{"name":"_situacao","type":"string"}],"name":"addAluno","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_nome","type":"string"},{"name":"_matricula","type":"string"},{"name":"_nota","type":"string"},{"name":"_situacao","type":"string"}],"name":"editar","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_id","type":"uint256"}],"name":"eventoEditar","type":"event"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"alunos","outputs":[{"name":"id","type":"uint256"},{"name":"nome","type":"string"},{"name":"matricula","type":"string"},{"name":"nota","type":"string"},{"name":"situacao","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"contAlunos","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"editores","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]');
var alunoContract = web3.eth.contract(abi);
instanciaContract = alunoContract.at('0x9ea39ecdcfd034b7228c633bb3b4b80b80ab823f');

//console.log(instanciaContract);

var alunosTabela = $("#alunosTabela");

instanciaContract.contAlunos((err, res) => {
    if (!err) {
        var contAlunos = res.c[0];

        for (var i = 1; i <= contAlunos; i++) {
            instanciaContract.alunos(i, (err, res) => {
                if (!err) {                    
                    var id = i;
					var nome = res[1];
					var matricula = res[2];
					var nota = res[3];
					var situacao = res[4];
                    
					// Render candidate Result
					var templateAlunos = "<tr><th>" + id + "</th><td>" + nome + "</td><td>" + matricula +
						"</td><td>" + nota + "</td><td>" + situacao + "</td></tr>";
					alunosTabela.append(templateAlunos);
                } else {
                    console.error(err);    
                }
            });
        }
    } else {
        console.error(err);    
    }
});

//var cont = instanciaContract.contAlunos.call();

var content = $("#content");

content.show();

function adicionaAluno() {
    var nome = $("#nome").val();
    var matricula = $("#matricula").val();
    var nota = $("#nota").val();
    var situacao = $("#situacao").val();
    instanciaContract.addAluno(nome, matricula, nota, situacao, {from: web3.eth.accounts[0]}, (err) => {
        if (err) {
            console.error(err);
        }
    });
}

function Adicionar() {
	document.location = "adicionar.html";
}
