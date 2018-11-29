App = {
	web3Provider: null,
	contracts: {},
	account: '0x0',
	hasVoted: false,

	init: function () {
		return App.initWeb3();
	},

	initWeb3: function () {
		// TODO: refactor conditional
		if (typeof web3 !== 'undefined') {
			// If a web3 instance is already provided by Meta Mask.
			App.web3Provider = web3.currentProvider;
			web3 = new Web3(web3.currentProvider);
		} else {
			// Specify default instance if no web3 instance provided
			App.web3Provider = new Web3.providers.HttpProvider('http://192.168.25.14:7545');
			web3 = new Web3(App.web3Provider);
		}
		return App.initContract();
	},

	initContract: function () {
		$.getJSON("Aluno.json", function (aluno) {
			// Instantiate a new truffle contract from the artifact
			App.contracts.Aluno = TruffleContract(aluno);
			// Connect provider to interact with contract
			App.contracts.Aluno.setProvider(App.web3Provider);

			//App.listenForEvents();

			return App.render();
		});
	},

	render: function () {
		var alunoInstance;
		var loader = $("#loader");
		var content = $("#content");

		loader.show();
		content.hide();

		// Load account data
		web3.eth.getCoinbase(function (err, account) {
			if (err === null) {
				App.account = account;
				$("#accountAddress").html("Your Account: " + account);
			}
		});

		// Load contract data
		App.contracts.Aluno.deployed().then(function (instance) {
			alunoInstance = instance;
			return alunoInstance.contAlunos();
		}).then(function (contAlunos) {
			var alunosTabela = $("#alunosTabela");
			alunosTabela.empty();

			var camposEditar = $('#camposEditar');
			camposEditar.empty();

			for (var i = 1; i <= contAlunos; i++) {
				alunoInstance.alunos(i).then(function (aluno) {
					var id = aluno[0];
					var nome = aluno[1];
					var matricula = aluno[2];
					var nota = aluno[3];
					var situacao = aluno[4];

					// Render candidate Result
					var templateAlunos = "<tr><th>" + id + "</th><td>" + nome + "</td><td>" + matricula +
						"</td><td>" + nota + "</td><td>" + situacao + "</td><td> <button type='button' id='" + id +
						"' class='editar' onclick='Editar(" + id + ")'>Editar</button> </td></tr>";
					alunosTabela.append(templateAlunos);
				});
			}
			loader.hide();
			content.show();
		}).catch(function (error) {
			console.warn(error);
		});
	},

	editarAluno: function () {
		var id = document.cookie;
		var nome = $("#nome").val();
		var matricula = $("#matricula").val();
		var nota = $("#nota").val();
		var situacao = $("#situacao").val();

		App.contracts.Aluno.deployed().then(function (instance) {
			return instance.editar(id, nome, matricula, nota, situacao, {
				from: App.account
			});
		}).catch(function (err) {
			console.error(err);
		});

		document.location = 'index.html';
		document.cookie = null;
	},

	adicionarAluno: function () {
		var nome = $("#nome").val();
		var matricula = $("#matricula").val();
		var nota = $("#nota").val();
		var situacao = $("#situacao").val();

		App.contracts.Aluno.deployed().then(function (instance) {
			return instance.addAluno(nome, matricula, nota, situacao, {
				from: App.account
			});
		}).catch(function (err) {
			console.error(err);
		});
	},

	adicionarTeste: function () {
		$.getJSON("js/Alunos_json.json", (data) => {
			$.each(data, (key, val) => {
				var situacao;
				if (val.Nota < 70) {
					situacao = 'Reprovado';
				} else {
					situacao = 'Aprovado';
				}
				App.contracts.Aluno.deployed().then(function (instance) {
					return instance.addAluno(val.Nomes, val.Matricula.toString(), val.Nota.toString(), situacao);
				}).catch(function (err) {
					console.error(err);
				});
			});
		});
	}
};

function Editar(id) {
	document.location = 'editar.html';
	document.cookie = id;
}

function Adicionar() {
	document.location = "adicionar.html";
}

$(function () {
	$(window).load(function () {
		App.init();
	});
});
