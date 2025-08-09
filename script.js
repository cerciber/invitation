// Funcionalidad básica de la carta
function initCardEffects() {
    const card = document.querySelector('.card');

    // Efecto de click para voltear la carta
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    initCardEffects();
}); 