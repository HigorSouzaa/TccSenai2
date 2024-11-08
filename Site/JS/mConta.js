
/* lapis E-mail */
const editEmailButton = document.getElementById('editEmail');
const emailInput = document.querySelector('.email-input');
const emailText = document.getElementById('emailText');
const saveEmailButton = document.getElementById('saveEmail');
const newEmailInput = document.getElementById('newEmail');

editEmailButton.addEventListener('click', function() {
    emailText.style.display = 'none';
    emailInput.style.display = 'block'; // Mostra o input
    newEmailInput.value = ''; // Limpa o input
    newEmailInput.focus(); // Foca no input
    
});

saveEmailButton.addEventListener('click', function() {
    const novoEmail = newEmailInput.value;
    if (novoEmail) {
        emailText.innerText = novoEmail; // Atualiza o texto do e-mail
        emailInput.style.display = 'none'; // Esconde o input após salvar
        emailText.style.display = 'block';
    } else {
        alert('Por favor, insira um e-mail válido.'); // Alerta se o campo estiver vazio
    }
});

/* lapis Nome*/

const editNomeButton = document.getElementById('editNome');
const nomeInput = document.querySelector('.nome-input');
const nomeText = document.getElementById('nomeText');
const saveNomeButton = document.getElementById('saveNome');
const newNomelInput = document.getElementById('newNome');

editNomeButton.addEventListener('click', function() {
    nomeText.style.display = 'none';
    nomeInput.style.display = 'block'; // Mostra o input
    newNomeInput.value = ''; // Limpa o input
    newNomeInput.focus(); // Foca no input
    
});

saveNomeButton.addEventListener('click', function() {
    const novoNome = newNomelInput.value;
    if (novoNome) {
       nomeText.innerText = novoNome; // Atualiza o texto do e-mail
        nomeInput.style.display = 'none'; // Esconde o input após salvar
        nomeText.style.display = 'block';
    } else {
        alert('Por favor, insira um nome válido.'); // Alerta se o campo estiver vazio
    }
});


/* input cpf */

function showInput(select) {
    
    const saveCP = document.getElementById('saveCP');
    const inputCPF = document.getElementById('cpf');
    if (select.value === 'cpf') {
        inputCPF.style.display = 'block';
        inputCPF.focus(); // Opcional: Foca no input ao aparecer

        /*Botão salvar cpf */
        saveCP.style.display = 'block';
        saveCP.focus(); // Opcional: Foca no input ao aparecer
    } else {
        inputCPF.style.display = 'none';
        inputCPF.value = ''; // Limpa o valor quando oculto
        /*Botão salvar cpf */
        saveCP.style.display = 'none';
        saveCP.value = ''; // Limpa o valor quando oculto
    }
}


const escritaCPF = document.getElementById('escritaCPF');
const saveCP = document.getElementById('saveCP');
const inputCPF = document.getElementById('cpf');
saveCP.addEventListener('click', function(){
   
    const novoCPF = inputCPF.value;
    if (novoCPF) {
       escritaCPF.innerText = "CPF: " +novoCPF; // Atualiza o texto do e-mail
        inputCPF.style.display = 'none'; // Esconde o input após salvar
        saveCP.style.display = 'none';
       
    } else {
        alert('Por favor, insira um cpf válido.'); // Alerta se o campo estiver vazio
    }

});


document.getElementById('sair').addEventListener('click', function() {
    // Faça o logout (remover token, etc.)
    window.location.replace('login.html'); // ou a URL da sua página de login
});

// Ao sair
sessionStorage.setItem('loggedOut', 'true');

// Na página que deve ser bloqueada
if (sessionStorage.getItem('loggedOut')) {
    window.location.replace('login.html');
}




