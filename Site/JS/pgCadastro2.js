// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAN-a9a4u9JSuG1PtfauZ5fSu6dlNcApgY",
    authDomain: "iahealthfit-52d82.firebaseapp.com",
    projectId: "iahealthfit-52d82",
    storageBucket: "iahealthfit-52d82.appspot.com",
    messagingSenderId: "231967722388",
    appId: "1:231967722388:web:cee934ed4395fdb96d9d81"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Função para alternar o menu do ícone da pessoa
function toggleMenu(event) {
    event.preventDefault(); // Evita que o link redirecione a página
    const icoPessoa = document.querySelector('.ico-pessoa');
    icoPessoa.classList.toggle('show-menu');
}

// Fecha o menu se clicar fora dele
document.addEventListener('click', function(event) {
    const icoPessoa = document.querySelector('.ico-pessoa');
    if (!icoPessoa.contains(event.target)) {
        icoPessoa.classList.remove('show-menu');
    }
});

// Formatação e validação de campos
['altura', 'idade', 'peso'].forEach(id => {
    document.getElementById(id).addEventListener('input', function() {
        this.value = this.value.replace(',', '.');
    });
});

// Função para validar campos do formulário
function validarCampos(nome, altura, telefone, idade, peso) {
    if (!nome || !altura || !telefone || !idade || !peso) {
        document.getElementById('mensagem').textContent = 'Por favor, preencha todos os campos.';
        document.getElementById('mensagem').style.color = 'red';
        return false;
    }
    return true;
}

// Função para cadastrar usuário no Firestore
const registerUser = async (usuarioData) => {
    try {
        await db.collection('usuarios').doc(usuarioData.nome).set(usuarioData);
        alert('Dados cadastrados com sucesso!');
        window.location.href = 'pgCadastro3.html'; // Redireciona após o cadastro
    } catch (error) {
        console.error('Erro ao cadastrar dados: ', error);
        document.getElementById('mensagem').textContent = 'Erro ao cadastrar dados. Tente novamente.';
        document.getElementById('mensagem').style.color = 'red';
    }
};

// Captura o formulário e adiciona o evento de envio
document.getElementById('formCadastro').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Coleta dados da página de cadastro
    const nome = document.getElementById('nome').value.trim();
    const altura = document.getElementById('altura').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const idade = document.getElementById('idade').value.trim();
    const peso = document.getElementById('peso').value.trim();

    // Armazena o nome no localStorage
    localStorage.setItem('usuarioNome', nome);

    // Valida os campos antes de registrar
    if (validarCampos(nome, altura, telefone, idade, peso)) {
        const usuarioData = { nome, altura, telefone, idade, peso };
        await registerUser(usuarioData);
    }
});
