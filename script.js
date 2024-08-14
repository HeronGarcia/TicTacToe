const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const messageElement = document.getElementById('message');

let currentPlayer = 'X'; // O jogador começa como 'X'
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Array que representa o tabuleiro
let isGameOver = false; // Variável para verificar se o jogo acabou

// Possíveis combinações de vitória
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Função para verificar se houve vitória
function checkWin() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            isGameOver = true;
            displayMessage(`Jogador ${gameBoard[a]} venceu!`);
            return;
        }
    }

    // Verifica empate
    if (!gameBoard.includes('')) {
        isGameOver = true;
        displayMessage('Empate!');
    }
}

// Função para exibir a mensagem de resultado
function displayMessage(message) {
    messageElement.textContent = message;
}

// Função para lidar com o clique em uma célula
function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (gameBoard[index] || isGameOver) return;

    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    checkWin();

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Função para reiniciar o jogo
function resetGame() {
    gameBoard.fill('');
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    isGameOver = false;
    displayMessage(''); // Limpa a mensagem ao reiniciar o jogo
}

// Adiciona o evento de clique em cada célula
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Adiciona o evento de clique no botão de reset
resetButton.addEventListener('click', resetGame);