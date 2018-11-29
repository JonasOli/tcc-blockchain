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

    mapping(address => bool) public editores;

    // buscar alunos
    mapping(uint => aluno) public alunos;

    // contagem de alunos
    uint public contAlunos;

    event eventoEditar (
        uint indexed _id
    );

    constructor () public {
        addAluno("João", "11515710", "62", "Reprovado");
        addAluno("Maria", "11111111", "86", "Aprovado");
    }

    function addAluno (string _nome, string _matricula, string _nota, string _situacao) public {
        contAlunos++;
        alunos[contAlunos] = aluno(contAlunos, _nome, _matricula, _nota, _situacao);
    }

    function editar (uint _id, string _nome, string _matricula, string _nota, string _situacao) public {
        editores[msg.sender] = true;

        alunos[_id].nome = _nome;
        alunos[_id].matricula = _matricula;
        alunos[_id].nota = _nota;
        alunos[_id].situacao = _situacao;

        emit eventoEditar(_id);
    }
}