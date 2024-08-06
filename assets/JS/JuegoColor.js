const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'gray'];

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.className);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var draggedElement = document.getElementsByClassName(data)[0];
    
    // Permitir soltar el elemento en cualquier caja de color
    if (event.target.className.includes('color-box')) {
        event.target.appendChild(draggedElement);
    }

    checkGame(); // Verificar el estado después de cada movimiento
}

function checkGame() {
    let allCorrect = true;
    colors.forEach(color => {
        const box = document.querySelector(`.color-box.${color}`);
        if (box.children.length !== 1 || !box.children[0].classList.contains(color)) {
            allCorrect = false;
        }
    });

    if (allCorrect) {
        document.getElementById('message').innerText = '¡Ganaste!';
    } else {
        document.getElementById('message').innerText = '';
    }
}

function resetGame() {
    const container = document.getElementById('objects-container');
    container.innerHTML = '';

    colors.forEach(color => {
        const box = document.querySelector(`.color-box.${color}`);
        while (box.firstChild) {
            box.removeChild(box.firstChild);
        }

        const object = document.createElement('div');
        object.className = `object ${color}`;
        object.draggable = true;
        object.ondragstart = drag;
        container.appendChild(object);
    });

    shuffleObjects();
    document.getElementById('message').innerText = '';
}

function shuffleObjects() {
    const container = document.getElementById('objects-container');
    for (let i = container.children.length; i >= 0; i--) {
        container.appendChild(container.children[Math.random() * i | 0]);
    }
}

window.onload = resetGame;
