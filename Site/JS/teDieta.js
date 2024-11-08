
/*//////////text Area/////////////*/

document.getElementById('newRefeicao').addEventListener('input', function() {
    document.getElementById('newRefeicaoB').value = this.value;
  });

  /*//////////text Area restrição/////////////*/

document.getElementById('newRestricao').addEventListener('input', function() {
    document.getElementById('newRestricaoB').value = this.value;
  });
  


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

// Recupera o nome do usuário armazenado no localStorage
const nomeUsuario = localStorage.getItem('usuarioNome');

// Função para buscar o nome do usuário no Firestore
async function buscarUsuarioNoFirestore(nome) {
    try {
        const usuarioRef = db.collection('usuarios').doc(nome);
        const doc = await usuarioRef.get();
        
        if (doc.exists) {
            console.log('Dados do usuário:', doc.data());
            return doc.data(); // Retorna os dados do usuário
        } else {
            console.log('Usuário não encontrado!');
            return null;
        }
    } catch (error) {
        console.error('Erro ao buscar dados do usuário: ', error);
        return null;
    }
}

// Função para exibir mensagem de boas-vindas com nome do usuário
async function exibirBoasVindas() {
    if (nomeUsuario) {
        // Busca os dados do usuário no Firestore
        const usuarioData = await buscarUsuarioNoFirestore(nomeUsuario);
        
        if (usuarioData) {
            const mensagemDiv = document.getElementById('mensagem');
            mensagemDiv.textContent = `Bem-vindo, ${usuarioData.nome || nomeUsuario}!`; // Exibe o nome do usuário
            mensagemDiv.style.color = 'green';
        }
    } else {
        console.error('Nome de usuário não encontrado.');
        alert('Erro: Nome de usuário não encontrado. Por favor, faça login novamente.');
    }
}

// Chama a função para exibir a mensagem de boas-vindas
exibirBoasVindas();

// Função para validar os campos do formulário
function validarCampos() {
    const refeicao = document.getElementById('newRefeicao').value.trim();
    const restricao = document.getElementById('newRestricao').value.trim();
    const restricaoSim = document.getElementById('sim');
    const restricaoNao = document.getElementById('nao');
    const mensagemDiv = document.getElementById('mensagem');

    if (refeicao === "" || restricao === "" || (!restricaoSim.checked && !restricaoNao.checked)) {
        // Verifica se algum campo está vazio ou se nenhuma opção foi selecionada em restricaoSim e restricaoNao
        mensagemDiv.textContent = 'Por favor, preencha todos os campos.';
        mensagemDiv.style.color = 'red';
        return false; // Retorna false para evitar o envio do formulário
    }
    
    mensagemDiv.textContent = ''; // Limpa a mensagem de erro
    return true; // Retorna true para permitir o envio do formulário
    
}

// Captura o botão de prosseguir e adiciona o evento de envio
document.getElementById('gerar').addEventListener('click', async function(event) {
    event.preventDefault();

    // Verifica se nomeUsuario está definido antes de tentar acessar Firestore
    if (!nomeUsuario) {
        console.error('Nome de usuário não encontrado.');
        alert('Erro: Nome de usuário não está disponível. Faça login novamente.');
        return;
    }


    if (validarCampos()) {
        // Se os campos estiverem válidos, pega os valores
        const refeicao = document.getElementById('newRefeicao').value.trim();
        const restricao = document.getElementById('newRestricao').value.trim();
        const sim = document.getElementById('sim').checked ? 'sim' : ''; // Obtém o valor de 'sim' se selecionado
        const nao = document.getElementById('nao').checked ? 'nao' : ''; // Obtém o valor de 'não' se selecionado

        const usuarioData = { refeicao, restricao, restricaoSim: sim, restricaoNao: nao };

        try {
            // Atualiza os dados do usuário no Firestore
            await db.collection('usuarios').doc(nomeUsuario).set(usuarioData, { merge: true });
            alert('Dados atualizados com sucesso!');
            window.location.href = 'teDieta.html'; // Redireciona após a atualização
        } catch (error) {
            console.error('Erro ao atualizar dados: ', error);
            alert('Erro ao atualizar dados. Tente novamente.');
        }
    }

});
  

