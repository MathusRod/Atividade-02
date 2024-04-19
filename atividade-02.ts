class Pessoa {
  nome: string;
  idade: number;

  constructor(nome: string, idade: number) {
    this.nome = nome;
    this.idade = idade;
  }
}
class Cidadao extends Pessoa {
  telefone: string;
  email: string;
  agendamentoVacina: string;

  constructor(nome: string, idade: number, telefone: string, email: string) {
    super(nome, idade);
    this.telefone = telefone;
    this.email = email;
    this.agendamentoVacina = null; // Inicialmente não agendado
  }

  agendarVacina(data: Date) {
    this.agendamentoVacina = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  }
}
class Funcionario extends Pessoa {
  cargo: string;
  salario: number;

  constructor(nome: string, idade: number, cargo: string, salario: number) {
    super(nome, idade);
    this.cargo = cargo;
    this.salario = salario;
  }
}

const _funcionario = new Funcionario("Matheus", 19, "Cadastrador", 1300);
const btn_Start = document.querySelector(".start") as HTMLElement;
btn_Start.addEventListener("click", () => {
  alert(`Seja bem vindo, ${_funcionario.nome}!`);
  funcionarioJanela();
});

let cidadao_array: Cidadao[] = [];
const pessoaDeAjuda = new Cidadao(
  "Carlos",
  23,
  "8898-9807",
  "carlos@obrigado.com"
);
cidadao_array.push(pessoaDeAjuda);

function funcionarioJanela() {
  const res = parseInt(
    prompt(
      `------------------------------------------------\n\nOpções:\n\n\t(1) - Cadastrar um novo cidadão\n\t(2) - Remover um cadastro de cidadão\n\t(3) - Ver seus dados\n\t(4) - Lista de cadastrados\n\t(5) - Adicionar um agendamento de vacina\n\t(6) - Sair\n\n------------------------------------------------`
    )
  );

  switch (res) {
    case 1:
      registroCidadao();
      break;
    case 2:
      if (cidadao_array.length > 0) {
        removerCidadao();
      } else {
        alert(
          "Não possui nenhum cidadão cadastrado no momento.\nCadastre um para poder fazer alguma remoção"
        );
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
      agendamento()
      break
    case 6:
      return;
    default:
      alert("Valor invalido!");
      return;
  }
}
function registroCidadao() {
  const nome: string = prompt(`Qual o nome do cidadão?`);
  const idade: number = parseInt(prompt(`Qual a idade de ${nome}?`));
  const telefone: string = prompt(
    `Qual o telefone de ${nome}?\nAVISO: SOMENTE OS 8 DIGITOS COM UM IFEN NO MEIO`
  );
  const email: string = prompt(`Qual o E-mail de ${nome}`);
  const novo_cidadao = new Cidadao(nome, idade, telefone, email);

  cidadao_array.push(novo_cidadao);
  console.log(cidadao_array);
}
function removerCidadao() {
  let texto = "Qual cidadão você deseja remover:\n";
  for (let i = 0; i < cidadao_array.length; i++) {
    texto += `(${i}) - ${cidadao_array[i].nome}\n`;
  }
  const res: number = parseInt(prompt(texto));
  if (res >= 0 && res <= cidadao_array.length) {
    cidadao_array = cidadao_array.filter((_, index) => index !== res);
    alert("Cadastro removido com sucesso!");
  } else alert("Valor invalido!");
}
function verDadosFuncionario() {
  const { nome, idade, cargo, salario } = _funcionario;
  alert(
    `-----------------\n\nSEUS DADOS\n\n\tNome: ${nome}\n\tIdade: ${idade}\n\tCargo: ${cargo}\n\tSalário: ${salario}`
  );
}
function showLista() {
  let texto = "LISTA\n------------------\n";
  for (let i = 0; i < cidadao_array.length; i++) {
    texto += `\nID: ${i+1}\nNOME: ${cidadao_array[i].nome}\nIDADE: ${cidadao_array[i].idade}\nTELEFONE: ${cidadao_array[i].telefone}\nE-MAIL: ${cidadao_array[i].email}\nAGENDAMENTO: `;
    if (cidadao_array[i].agendamentoVacina != null) {
      texto += `${cidadao_array[i].agendamentoVacina}\n`;
    } else {
      texto += `SEM AGENDAMENTO\n`;
    }
  }
  texto += `\n------------------`;

  return texto
}
function agendamento(){
  const texto = showLista()
  const res:number = parseInt(prompt(texto)) - 1
  const data:string = prompt("Qual a data do agendamento?\nColoque dessa forma AA-MM-DD") 
  cidadao_array[res].agendarVacina(new Date(data)) 

}

// novo_cidadao.agendarVacina(new Date("2024-04-20"))
