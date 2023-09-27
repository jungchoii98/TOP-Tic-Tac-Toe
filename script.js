let Cell = () => {
  let _value = 0;

  const getValue = () => {
    return _value;
  };

  const changeValue = (new_value) => {
    _value = new_value
  };

  return { getValue, changeValue };
};

let GameBoard = ( () => {
  let _board = [];
  let _playerState = 1;

  for (let i=0; i<3; i++) {
    _board[i] = [];
    for (let j=0; j<3; j++) {
      _board[i].push(Cell());
    }
  }

  const getBoard = () => {
    return _board;
  };

  const getPlayerState = () => {
    return _playerState;
  };

  const placeMove = (i, j) => {
    _board[i][j].changeValue(_playerState);
  };

  const changePlayerState = () => {
    _playerState = _playerState === 1 ? 2 : 1;
  };

  const isValidSpot = (i, j) => {
    return _board[i][j].getValue() == 0 ? true : false;
  };

  const checkWinStatus = () => {
    let winConditions = [
      [0,1,2], // first row
      [3,4,5], // second row
      [6,7,8], // third row
      [0,3,6], // first column
      [1,4,7], // second column
      [2,5,8], // third column
      [0,4,8], // first diagonal
      [2,4,6], // second diagonal
    ];
    for (condition of winConditions) {
      let indexes = condition;
      let [first, second, third] = Array.from(indexes, (x) => {
        let i = Math.floor(x / 3);
        let j = x % 3;
        return [i,j];
      });
      let firstSquare = _board[first[0]][first[1]].getValue();
      let secondSquare = _board[second[0]][second[1]].getValue();
      let thirdSquare = _board[third[0]][third[1]].getValue();
      if (firstSquare === 0 || secondSquare === 0 || thirdSquare === 0) {
        continue;
      }
      if (firstSquare === secondSquare && secondSquare === thirdSquare) {
        return true;
      }
    }
    return false;
  };

  const isDraw = () => {
    for (let i=0; i<3; i++) {
      for (let j=0; j<3; j++) {
        if (_board[i][j].getValue() === 0) {
          return false;
        }
      }
    }
    return true;
  };

  const reset = () => {
    for (let i=0; i<3; i++) {
      for (let j=0; j<3; j++) {
        _board[i][j].changeValue(0);
      }
    }
  };

  return { getBoard, getPlayerState, changePlayerState, placeMove, isValidSpot, checkWinStatus, isDraw, reset };
} )();

let GameController = ( () => {
  let _squares = [];

  const renderBoard = () => {
    for (let i=0; i<3; i++) {
      for (let j=0; j<3; j++) {
        let displayValue = '';
        switch (GameBoard.getBoard()[i][j].getValue()) {
          case 1:
            displayValue = 'X';
            break;
          case 2:
            displayValue = 'O';
            break;
          default:
            break; 
        }
        _squares[i][j].innerHTML = `${displayValue}`;
      }
    }
  };

  const _playMove = (event) => {
    let btn = event.target;
    let index = Array.from(btn.parentNode.children).indexOf(btn);
    let i = Math.floor(index / 3);
    let j = index % 3;
    if (GameBoard.isValidSpot(i, j)) {
      GameBoard.placeMove(i, j);
      renderBoard();
      if (GameBoard.checkWinStatus()) {
        console.log(`player ${GameBoard.getPlayerState()} has won`);
        // GameBoard.reset();
        // renderBoard();
      }
      if (GameBoard.isDraw()) {
        console.log('boring draw game');
      }
      GameBoard.changePlayerState();
    }
  };

  for (let i=0; i<3; i++) {
    _squares[i] = [];
    for (let j=0; j<3; j++) {
      let index = (3*i) + j + 1;
      let btnElement = document.querySelector(`.game-container button:nth-child(${index})`);
      btnElement.addEventListener("click", _playMove);
      _squares[i].push(btnElement);
    }
  }
} )();