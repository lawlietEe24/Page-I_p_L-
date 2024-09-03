let sidebarOpen = false;

document.getElementById('menuButton').addEventListener('click', function() {
    if (sidebarOpen) {
        closeSidebar();
    } else {
        openSidebar();
    }
});

document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('mySidebar');
    const button = document.getElementById('menuButton');
    if (sidebarOpen && !sidebar.contains(event.target) && !button.contains(event.target)) {
        closeSidebar();
    }
});

function openSidebar() {
    document.getElementById('mySidebar').style.width = "400px";
    document.getElementById('mySidebar').style.height = "100px";
    document.getElementById('mainContent').style.marginLeft = "400px";
    document.getElementById('menuButton').style.display = "none"; // Oculta el botón cuando la sidebar está abierta
    sidebarOpen = true;
}

function closeSidebar() {
    document.getElementById('mySidebar').style.width = "0";
    document.getElementById('mainContent').style.marginLeft = "0";
    
    // Espera el tiempo de la transición antes de mostrar el botón
    setTimeout(function() {
        document.getElementById('menuButton').style.display = "block"; // Muestra el botón nuevamente
    }, 500); // Duración de la transición en milisegundos

    sidebarOpen = false;
}
