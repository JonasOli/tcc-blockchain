pragma solidity ^0.4.24;

contract Aluno {
    // modelo do aluno
    struct aluno {
        uint id;
        string nome;
        string matricula;
        string nota;
    }

    // buscar alunos
    mapping(uint => aluno) public alunos;

    // contagem de alunos
    uint public contAlunos;

    constructor () public {
        addAluno("Jonas", "11515710", "85");
        addAluno("Hugo", "11111111", "100");
    }

    function addAluno (string _nome, string _matricula, string _nota) private {
        contAlunos++;
        alunos[contAlunos] = aluno(contAlunos, _nome, _matricula, _nota);
    }
}