// Obtener elementos del DOM
const menuIcon = document.getElementById('menu');
const aside = document.getElementById('aside');
const mainContent = document.querySelector('.main');

// Agregar evento de clic al ícono de menú
menuIcon.addEventListener('click', function() {
  aside.classList.toggle('active');
  mainContent.classList.toggle('shifted');
});
