
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

    if (cell.getValue() === 0) {
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
  let value = 0;

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
    {
      name: playerOneName,
      token: 1
    },
    {
      name: playerTwoName,
      token: 2
    }
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const checkWinner = () => {
      const currentBoard = board.getBoard()
      const token = getActivePlayer().token;


      if ((currentBoard[0][0].getValue() === token &&
        currentBoard[0][1].getValue() === token &&
        currentBoard[0][2].getValue() === token) ||
        (currentBoard[1][0].getValue() === token &&
          currentBoard[1][1].getValue() === token &&
          currentBoard[1][2].getValue() === token) || (currentBoard[2][0].getValue() === token && currentBoard[2][1].getValue() === token && currentBoard[2][2].getValue() === token)
      ) {
        console.log(`${getActivePlayer().name} gano!`);
        return true;


      } else if ((currentBoard[0][0].getValue() === token &&
        currentBoard[1][0].getValue() === token &&
        currentBoard[2][0].getValue() === token) ||
        (currentBoard[0][1].getValue() === token &&
          currentBoard[1][1].getValue() === token &&
          currentBoard[2][1].getValue() === token) || (currentBoard[0][2].getValue() === token && currentBoard[1][2].getValue() === token && currentBoard[2][2].getValue() === token)) {
             console.log(`${getActivePlayer().name} gano!`);
              return true;


      } else if ((currentBoard[0][0].getValue() === token &&
        currentBoard[1][1].getValue() === token &&
        currentBoard[2][2].getValue() === token) ||
        (currentBoard[0][2].getValue() === token &&
          currentBoard[1][1].getValue() === token &&
          currentBoard[2][0].getValue() === token)) {
             console.log(`${getActivePlayer().name} gano!`);
                     return true;

      }
      return false;
    }

  const playRound = (row, column) => {
    // Suelta un token para el jugador actual
   
    board.placeToken(row, column, getActivePlayer().token);

      if(checkWinner()) return;
      switchPlayerTurn();
      printNewRound();
    };

    printNewRound();

    // Para la versión de consola, solo usaremos playRound, pero necesitaremos
    // getActivePlayer para la versión de interfaz gráfica, así que lo revelo ahora
    return {
      playRound,
      getActivePlayer,
      getBoard: board.getBoard
    };
  }


  function ScreenController() {


    
    function clickHandlerBoard() {

    }
  }

  updateScreen();

  ScreenController()