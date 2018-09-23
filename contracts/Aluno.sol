pragma solidity ^0.4.24;

contract Aluno {
    // modelo do aluno
    struct aluno {
        uint id;
        string nome;
        string matricula;
        string nota;
        string situacao;
    }

    // buscar alunos
    mapping(uint => aluno) public alunos;

    // contagem de alunos
    uint public contAlunos;

    constructor () public {
        addAluno("João", "11515710", "62", "Reprovado");
        addAluno("Maria", "11111111", "86", "Aprovado");
    }

    function addAluno (string _nome, string _matricula, string _nota, string _situacao) private {
        contAlunos++;
        alunos[contAlunos] = aluno(contAlunos, _nome, _matricula, _nota, _situacao);
    }
}