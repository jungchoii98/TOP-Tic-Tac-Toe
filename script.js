let Cell = () => {
  let value = 0;

  const getValue = () => {
    return value;
  };

  const changeValue = (new_value) => {
    value = new_value
  };

  return { getValue, changeValue };
};

let GameBoard = ( () => {
  let board = [];

  for (let i=0; i<3; i++) {
    board[i] = [];
    for (let j=0; j<3; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => {
    return board;
  };

  const placeMove = (player, i, j) => {
    board[i][j].changeValue(player);
  };

  const reset = () => {
    for (let i=0; i<3; i++) {
      for (let j=0; j<3; j++) {
        board[i][j].changeValue(0);
      }
    }
  };

  return { getBoard, placeMove, reset };
} )();