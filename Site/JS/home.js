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
 
 /* Barra de pontos*/

 document.querySelectorAll('.month').forEach(month => {
    month.addEventListener('click', function() {
        const point = document.getElementById('point');
        const monthBar = document.getElementById('month-bar');
        
        // Obtém a posição do mês clicado
        const monthRect = this.getBoundingClientRect();
        const monthBarRect = monthBar.getBoundingClientRect();
        const offsetX = monthRect.left - monthBarRect.left;

        // Atualiza a largura do ponto
        let currentWidth = parseInt(window.getComputedStyle(point).width, 10);
        let newWidth = currentWidth + 0; // Incrementa a largura em 10px
        point.style.width = `${newWidth}px`;

        // Move o ponto para a posição correspondente na barra superior
        point.style.left = `${offsetX}px`;
    });
});