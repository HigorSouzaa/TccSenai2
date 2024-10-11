
/*ico pessoa*/


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

/*//////////fim ico pessoa/////////////*/


/* validações para quando o botão cadastrar for acionado*/

// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const emailErrorMessage = document.getElementById('email-error-message');
    const generalErrorMessage = document.getElementById('error-message');

    // Função para validar o e-mail
    function validateEmail(email) {
        // Verifica se o e-mail contém '@'
        const emailRegex = /@/;
        return emailRegex.test(email);
    }

    // Função para validar o formulário
    function validateForm(email, senha) {
        return validateEmail(email) && senha;
    }

    // Adiciona o evento de submit no formulário
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Obtém os valores dos campos do formulário
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value.trim();

        // Limpa as mensagens de erro
        emailErrorMessage.textContent = '';
        generalErrorMessage.textContent = '';

        // Valida os campos
        if (validateForm(email, senha)) {
            // Se a validação for bem-sucedida, redireciona para outra página
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'pgCadastro2.html'; // Substitua pelo URL desejado
        } else {
            // Exibe uma mensagem de erro se a validação falhar
            if (!validateEmail(email)) {
                emailErrorMessage.textContent = 'O e-mail deve conter "@"';
            }
            if (!senha) {
                generalErrorMessage.textContent = 'Por favor, preencha todos os campos obrigatórios.';
            }
        }
    });
});