
//Separa la lógica de la interfaz del usuario. Una excelente estrategia para separarlo es desafiar a desarrollar el juego para que se pueda jugar completamente en consola;
/*------------------------------------------------------------------------------------ */
function Gameboard() {   //Representa todo el tablero (se crean 3 filas y columnas)
  const rows = 3;
  const columns = 3;
  const board = [];
  //Se crea la matriz bidimensional (board)
  for (let i = 0; i < rows; i++) {    //fila 0 representa fila superior, columna 0 representa columna mas a la izquierda
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;  //devuelve el tablero completo

  const placeToken = (rw, col, player) => {
    const cell = board[rw][col];

    if (cell.getValue() === '') {
      cell.addToken(player);
    } else {
      console.log('Esa celda ya está ocupada, elige otra')
    }
  }

  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
    console.log(boardWithCellValues);
  }

  return { getBoard, placeToken, printBoard };

}


/*------------------------------------------------------------------------------------ */
function Cell() {
  let value = '';

  // Acepta la ficha de un jugador para cambiar el valor de la celda
  const addToken = (player) => {
    value = player;
  };

  // ¿Cómo recuperaremos el valor actual de esta celda mediante el closure?
  const getValue = () => value;

  return {
    addToken,
    getValue
  };
}
/*------------------------------------------------------------------------------------ */



function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
  const board = Gameboard();

  const players = [
    { name: playerOneName, token: 'x' },
    { name: playerTwoName, token: 'o' }
  ];

  let activePlayer = players[0];
  let gameOver = false; // 

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;
  const getGameOver = () => gameOver;

  const checkWinner = () => {
    const currentBoard = board.getBoard();
    const token = getActivePlayer().token;

    const win =
      // Filas
      (currentBoard[0][0].getValue() === token &&
        currentBoard[0][1].getValue() === token &&
        currentBoard[0][2].getValue() === token) ||
      (currentBoard[1][0].getValue() === token &&
        currentBoard[1][1].getValue() === token &&
        currentBoard[1][2].getValue() === token) ||
      (currentBoard[2][0].getValue() === token &&
        currentBoard[2][1].getValue() === token &&
        currentBoard[2][2].getValue() === token) ||

      // Columnas
      (currentBoard[0][0].getValue() === token &&
        currentBoard[1][0].getValue() === token &&
        currentBoard[2][0].getValue() === token) ||
      (currentBoard[0][1].getValue() === token &&
        currentBoard[1][1].getValue() === token &&
        currentBoard[2][1].getValue() === token) ||
      (currentBoard[0][2].getValue() === token &&
        currentBoard[1][2].getValue() === token &&
        currentBoard[2][2].getValue() === token) ||

      // Diagonales
      (currentBoard[0][0].getValue() === token &&
        currentBoard[1][1].getValue() === token &&
        currentBoard[2][2].getValue() === token) ||
      (currentBoard[0][2].getValue() === token &&
        currentBoard[1][1].getValue() === token &&
        currentBoard[2][0].getValue() === token);

    if (win) {
      console.log(`${getActivePlayer().name} ganó!`);
      gameOver = true; 
      return getActivePlayer().name; 
    }

    return null; 
  };

  const playRound = (row, column) => {
    if (gameOver) return; 

    board.placeToken(row, column, getActivePlayer().token);

    const winner = checkWinner();
    if (winner) {
      return winner; 
    }

    switchPlayerTurn();
    return null;
  };

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
    getGameOver,
  };
}



  function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');

  const updateScreen = (winner = null) => {
    boardDiv.textContent = '';

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    if (winner) {
      playerTurnDiv.textContent = `${winner} ganó`;
    } else if (game.getGameOver()) {
      playerTurnDiv.textContent = `¡Empate! `;
    } else {
      playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;
    }

    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const cellButton = document.createElement('button');
        cellButton.classList.add('cell');
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = columnIndex;
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      });
    });
  };

  function clickHandlerBoard(e) {
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;

    if (selectedRow === undefined || selectedColumn === undefined) return;
    if (game.getGameOver()) return; // 

    const winner = game.playRound(parseInt(selectedRow), parseInt(selectedColumn));
    updateScreen(winner);
  }

  boardDiv.addEventListener('click', clickHandlerBoard);
  updateScreen();
}

ScreenController();
