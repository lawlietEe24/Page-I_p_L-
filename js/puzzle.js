var rows = 3;
var columns = 3;

var currTile;
var otherTile;

var turns = 0;
var imgOrder = [];
var board = document.getElementById("board");
var newImageBtn = document.getElementById("newImageBtn");

newImageBtn.addEventListener("click", function() {
    loadImage();
});

function loadImage() {
    board.innerHTML = ""; 
    imgOrder = [];
    turns = 0;
    document.getElementById("turns").innerText = turns;

    let imgURL = `https://picsum.photos/360/360?random=${Math.random()}`;

    let image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = imgURL;

    image.onload = function() {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");

        canvas.width = 360;
        canvas.height = 360;

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                let tile = document.createElement("img");
                tile.id = r.toString() + "-" + c.toString();

                let x = c * 120;
                let y = r * 120;

                let pieceCanvas = document.createElement("canvas");
                pieceCanvas.width = 120;
                pieceCanvas.height = 120;

                let pieceCtx = pieceCanvas.getContext("2d");
                pieceCtx.drawImage(canvas, x, y, 120, 120, 0, 0, 120, 120);

                tile.src = pieceCanvas.toDataURL();
                imgOrder.push(tile.src);

                tile.addEventListener("dragstart", dragStart);
                tile.addEventListener("dragover", dragOver);
                tile.addEventListener("dragenter", dragEnter);
                tile.addEventListener("dragleave", dragLeave);
                tile.addEventListener("drop", dragDrop);
                tile.addEventListener("dragend", dragEnd);

                board.appendChild(tile);
            }
        }

        shuffleTiles();
    };
}

function shuffleTiles() {
    for (let i = board.children.length; i >= 0; i--) {
        board.appendChild(board.children[Math.random() * i | 0]);
    }
}

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    let currIndex = Array.from(board.children).indexOf(currTile);
    let otherIndex = Array.from(board.children).indexOf(otherTile);

    if (isAdjacent(currIndex, otherIndex)) {
        [board.children[currIndex].src, board.children[otherIndex].src] = [board.children[otherIndex].src, board.children[currIndex].src];

        turns += 1;
        document.getElementById("turns").innerText = turns;

        if (checkIfSolved()) {
            setTimeout(() => {
                let userConfirmed = confirm("¡Felicidades! Has completado el rompecabezas en " + turns + " movimientos. ¿Deseas volver al inicio?");
                if (userConfirmed) {
                    window.location.href = "index.html"; // Redirige a la página de inicio
                } else {
                    board.style.pointerEvents = "none"; // Desactiva más interacciones si el usuario no quiere regresar
                }
            }, 100); // Añadir un pequeño retraso para mostrar el mensaje después del último movimiento
        }
    }
}

function isAdjacent(currIndex, otherIndex) {
    let r1 = Math.floor(currIndex / columns);
    let c1 = currIndex % columns;

    let r2 = Math.floor(otherIndex / columns);
    let c2 = otherIndex % columns;

    return (r1 === r2 && Math.abs(c1 - c2) === 1) || (c1 === c2 && Math.abs(r1 - r2) === 1);
}

function checkIfSolved() {
    for (let i = 0; i < board.children.length; i++) {
        if (board.children[i].src !== imgOrder[i]) {
            return false;
        }
    }
    return true;
}

window.onload = loadImage;
