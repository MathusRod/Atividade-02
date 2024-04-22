var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Pessoa = /** @class */ (function () {
    function Pessoa(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }
    return Pessoa;
}());
var Cidadao = /** @class */ (function (_super) {
    __extends(Cidadao, _super);
    function Cidadao(nome, idade, telefone, email) {
        var _this = _super.call(this, nome, idade) || this;
        _this.telefone = telefone;
        _this.email = email;
        _this.agendamentoVacina = null; // Inicialmente não agendado
        return _this;
    }
    Cidadao.prototype.agendarVacina = function (data) {
        this.agendamentoVacina = "".concat(data.getDate(), "/").concat(data.getMonth() + 1, "/").concat(data.getFullYear());
    };
    return Cidadao;
}(Pessoa));
var Funcionario = /** @class */ (function (_super) {
    __extends(Funcionario, _super);
    function Funcionario(nome, idade, cargo, salario) {
        var _this = _super.call(this, nome, idade) || this;
        _this.cargo = cargo;
        _this.salario = salario;
        return _this;
    }
    return Funcionario;
}(Pessoa));
var _funcionario = new Funcionario("Matheus", 19, "Cadastrador", 1300);
var btn_Start = document.querySelector(".start");
btn_Start.addEventListener("click", function () {
    alert("Seja bem vindo, ".concat(_funcionario.nome, "!"));
    funcionarioJanela();
});
var cidadao_array = [];
var pessoaDeAjuda = new Cidadao("Carlos", 23, "8898-9807", "carlos@obrigado.com");
cidadao_array.push(pessoaDeAjuda);
function funcionarioJanela() {
    var res = parseInt(prompt("------------------------------------------------\n\nOp\u00E7\u00F5es:\n\n\t(1) - Cadastrar um novo cidad\u00E3o\n\t(2) - Remover um cadastro de cidad\u00E3o\n\t(3) - Ver seus dados\n\t(4) - Lista de cadastrados\n\t(5) - Adicionar um agendamento de vacina\n\t(6) - Sair\n\n------------------------------------------------"));
    switch (res) {
        case 1:
            registroCidadao();
            break;
        case 2:
            if (cidadao_array.length > 0) {
                removerCidadao();
            }
            else {
                alert("Não possui nenhum cidadão cadastrado no momento.\nCadastre um para poder fazer alguma remoção");
                return;
            }
            break;
        case 3:
            verDadosFuncionario();
            break;
        case 4:
            alert(showLista());
            break;
        case 5:
            agendamento();
            break;
        case 6:
            return;
        default:
            alert("Valor invalido!");
            return;
    }
}
function registroCidadao() {
    var nome = prompt("Qual o nome do cidad\u00E3o?");
    var idade = parseInt(prompt("Qual a idade de ".concat(nome, "?")));
    var telefone = prompt("Qual o telefone de ".concat(nome, "?\nAVISO: SOMENTE OS 8 DIGITOS COM UM IFEN NO MEIO"));
    var email = prompt("Qual o E-mail de ".concat(nome));
    var novo_cidadao = new Cidadao(nome, idade, telefone, email);
    cidadao_array.push(novo_cidadao);
    console.log(cidadao_array);
}
function removerCidadao() {
    var texto = "Qual cidadão você deseja remover:\n";
    for (var i = 0; i < cidadao_array.length; i++) {
        texto += "(".concat(i, ") - ").concat(cidadao_array[i].nome, "\n");
    }
    var res = parseInt(prompt(texto));
    if (res >= 0 && res <= cidadao_array.length) {
        cidadao_array = cidadao_array.filter(function (_, index) { return index !== res; });
        alert("Cadastro removido com sucesso!");
    }
    else
        alert("Valor invalido!");
}
function verDadosFuncionario() {
    var nome = _funcionario.nome, idade = _funcionario.idade, cargo = _funcionario.cargo, salario = _funcionario.salario;
    alert("-----------------\n\nSEUS DADOS\n\n\tNome: ".concat(nome, "\n\tIdade: ").concat(idade, "\n\tCargo: ").concat(cargo, "\n\tSal\u00E1rio: ").concat(salario));
}
function showLista() {
    var texto = "LISTA\n------------------\n";
    for (var i = 0; i < cidadao_array.length; i++) {
        texto += "\nID: ".concat(i + 1, "\nNOME: ").concat(cidadao_array[i].nome, "\nIDADE: ").concat(cidadao_array[i].idade, "\nTELEFONE: ").concat(cidadao_array[i].telefone, "\nE-MAIL: ").concat(cidadao_array[i].email, "\nAGENDAMENTO: ");
        if (cidadao_array[i].agendamentoVacina != null) {
            texto += "".concat(cidadao_array[i].agendamentoVacina, "\n");
        }
        else {
            texto += "SEM AGENDAMENTO\n";
        }
    }
    texto += "\n------------------";
    return texto;
}
function agendamento() {
    var texto = showLista();
    var res = parseInt(prompt(texto)) - 1;
    var data = prompt("Qual a data do agendamento?\nColoque dessa forma AA-MM-DD");
    cidadao_array[res].agendarVacina(new Date(data));
}
// novo_cidadao.agendarVacina(new Date("2024-04-20"))
