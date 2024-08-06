let currentQuestion;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion() {
    const num1 = getRandomInt(1, 10);
    const num2 = getRandomInt(1, 10);

    currentQuestion = {
        num1: num1,
        num2: num2,
        answer: num1 + num2
    };

    document.getElementById('question').innerText = `${num1} + ${num2} = ?`;
    document.getElementById('answer').value = '';
    document.getElementById('message').innerText = '';
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    if (userAnswer === currentQuestion.answer) {
        document.getElementById('message').innerText = '¡Correcto!';
    } else {
        document.getElementById('message').innerText = '¡Incorrecto! Inténtalo de nuevo.';
    }
}

function nextQuestion() {
    generateQuestion();
}

window.onload = generateQuestion;
