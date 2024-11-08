// Configuração do Firebase (substitua com os seus valores)
const firebaseConfig = {
    apiKey: "AIzaSyAN-a9a4u9JSuG1PtfauZ5fSu6dlNcApgY",
    authDomain: "iahealthfit-52d82.firebaseapp.com",
    projectId: "iahealthfit-52d82",
    storageBucket: "iahealthfit-52d82.appspot.com",
    messagingSenderId: "231967722388",
    appId: "1:231967722388:web:cee934ed4395fdb96d9d81"
};

// Inicializando o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Função para exibir erro no campo de e-mail
const showError = (message) => {
    const emailError = document.getElementById('email-error-message');
    emailError.textContent = message;
};

// Função para cadastrar usuário no Firestore
const registerUser = async (email, senha) => {
    try {
        // Usa o email como ID do documento
        await db.collection('usuarios').doc(email).set({
            email: email,
            senha: senha
        });
        alert('Usuário cadastrado com sucesso!');
    } catch (error) {
        console.error('Erro ao cadastrar usuário: ', error);
        showError('Erro ao cadastrar usuário. Tente novamente.');
    }
};

// Captura o formulário e adiciona o evento de envio
document.getElementById('registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Validação simples (você pode adicionar mais validações se precisar)
    if (!email || !senha) {
        showError('Preencha todos os campos!');
        return;
    }

    // Chama a função para registrar o usuário no Firestore
    await registerUser(email, senha);
    window.location.href = 'pgCadastro2.html'; // Substitua pelo URL desejado
});
