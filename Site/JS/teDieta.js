

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


/*//////////text Area/////////////*/

document.getElementById('newRefeicao').addEventListener('input', function() {
    document.getElementById('newRefeicaoB').value = this.value;
  });
  

  

