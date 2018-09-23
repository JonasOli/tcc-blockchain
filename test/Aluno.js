var Aluno = artifacts.require("./Aluno.sol");

contract("Aluno", (accounts) => {
    var instaciaAluno;

    it("inicializa com dois alunos", () => {
        return Aluno.deployed().then((instance) => {
            return instance.contAlunos();
        }).then((cont) => {
            assert.equal(cont, 2);
        });
    });

    it("Inicializa os alunos com os valores corretos", () => {
        return Aluno.deployed().then((instance) => {
            instaciaAluno = instance;
            return instaciaAluno.alunos(1);
        }).then((aluno) => {
            assert.equal(aluno[0], 1, "Id");
            assert.equal(aluno[1], "João", "Nome");
            assert.equal(aluno[2], "11515710", "Matricula");
            assert.equal(aluno[3], "62", "nota");
            assert.equal(aluno[4], "Reprovado", "Situação");
            return instaciaAluno.alunos(2);
        }).then((aluno) => {
            assert.equal(aluno[0], 2, "Id");
            assert.equal(aluno[1], "Maria", "Nome");
            assert.equal(aluno[2], "11111111", "Matricula");
            assert.equal(aluno[3], "86", "nota");
            assert.equal(aluno[4], "Aprovado", "Situação");
        });
    });
});