document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário
    if (validarFormulario()) {
        salvarDados();
        exibirDados();
    }
});

function validarFormulario() {
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/; // Apenas letras e espaços

    // Validação do nome (mínimo 3 letras, máximo 120)
    if (nome.length < 3 || nome.length > 120) {
        console.log("O nome deve ter entre 3 e 120 caracteres.");
        return false;
    }

    // Validação para garantir que o nome contém apenas letras
    if (!nomeRegex.test(nome)) {
        console.log("O nome deve conter apenas letras e espaços.");
        return false;
    }

    // Verifica o formato da data se o campo não estiver vazio
    if (dataNascimento) {
        const dataFormatada = new Date(dataNascimento);
        if (isNaN(dataFormatada.getTime())) {
            console.log("A data de nascimento é inválida.");
            return false;
        }
    } else {
        console.log("A data de nascimento é obrigatória.");
        return false;
    }

    // Se tudo estiver correto
    console.log("Formulário validado com sucesso!");
    return true;
}

function salvarDados() {
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;

    // Salvando os dados no localStorage
    localStorage.setItem('nome', nome);
    localStorage.setItem('dataNascimento', dataNascimento);
}

function exibirDados() {
    // Obtendo os dados do localStorage
    const nome = localStorage.getItem('nome');
    const dataNascimento = localStorage.getItem('dataNascimento');

    // Selecionando a tabela
    const tabelaCorpo = document.getElementById('tabelaCorpo');

    // Limpando a tabela antes de adicionar nova linha
    tabelaCorpo.innerHTML = '';

    // Criando uma nova linha com os dados
    const novaLinha = document.createElement('tr');
    
    const celulaNome = document.createElement('td');
    celulaNome.textContent = nome;

    const celulaDataNascimento = document.createElement('td');
    celulaDataNascimento.textContent = dataNascimento;

    const celulaAcoes = document.createElement('td');
    const botaoEditar = document.createElement('button');
    botaoEditar.textContent = 'Editar';
    botaoEditar.addEventListener('click', function() {
        editarDados(nome, dataNascimento);
    });

    celulaAcoes.appendChild(botaoEditar);

    novaLinha.appendChild(celulaNome);
    novaLinha.appendChild(celulaDataNascimento);
    novaLinha.appendChild(celulaAcoes);

    // Adicionando a linha na tabela
    tabelaCorpo.appendChild(novaLinha);
}

function editarDados(nome, dataNascimento) {
    // Carregar os dados no formulário para edição
    document.getElementById('nome').value = nome;
    document.getElementById('dataNascimento').value = dataNascimento;
}

// Exibir os dados ao carregar a página, caso existam
document.addEventListener('DOMContentLoaded', exibirDados);