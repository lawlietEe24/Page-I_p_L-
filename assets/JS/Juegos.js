document.addEventListener('DOMContentLoaded', () => {
    // Efecto de carga suave de la página
    document.body.style.opacity = 0;
    setTimeout(() => {
        document.body.style.opacity = 1;
        document.body.style.transition = 'opacity 1s';
    }, 200);
});

// Filtrar juegos por nombre
function filterGames() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const gameCards = document.querySelectorAll('.game-card');

    gameCards.forEach(card => {
        const gameName = card.getAttribute('data-name').toLowerCase();
        if (gameName.includes(searchInput)) {
            card.style.display = 'block'; // Asegúrate de usar una propiedad que permita la interacción
        } else {
            card.style.display = 'none';
        }
    });
}