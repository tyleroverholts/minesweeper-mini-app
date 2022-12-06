import React, {useState, useEffect} from 'react';

import './App.css';

function App() {
  const [tile, setTile] = useState({
    isClicked: false,
    isBomb: false,
    cellCoords: 0,
    adjacentBombs: 0,
    adjacentCells: [],
    row: 0,
    position: 1
  });
  const [gameBoard, setGameBoard] = useState([]);
  const [bombsToPlay, setBombsToPlay] = useState(10);
  const [randomNumberArray, setRandomNumberArray] = useState([]);

  //ADD ARRAY OF VALUES REPRESENTING ADJACENT CELLS
  const setAdjacentCells = (tile) => {
    const row = tile.row;
    const position = tile.position;
    let cellsArray = []
    if(position === 0){
      if(row === 1){
        for(let i = row; i <= row+1; i++){
          let positionValue
          for(let j = position; j <= position+1; j++){
            if(i === row && j === position){
              continue;
            }
            positionValue = i / 10 + j / 100
            cellsArray.push(positionValue.toFixed(2))
          }
        }
      }
      if(row === 10){
        for(let i = row-1; i <= row; i++){
          let positionValue
          for(let j = position; j <= position+1; j++){
            if(i === row && j === position){
              continue;
            }
            positionValue = i / 10 + j / 100
            cellsArray.push(positionValue.toFixed(2))
          }
        }
      }else{
        for(let i = row-1; i <= row+1; i++){
          let positionValue
          for(let j = position; j <= position+1; j++){
            if(i === row && j === position){
              continue;
            }
            positionValue = i / 10 + j / 100
            cellsArray.push(positionValue.toFixed(2))
          }
        }
      }
    }else if(position === 9){
      if(row === 1){
        for(let i = row; i <= row+1; i++){
          let positionValue
          for(let j = position-1; j <= position; j++){
            if(i === row && j === position){
              continue;
            }
            positionValue = i / 10 + j / 100
            cellsArray.push(positionValue.toFixed(2))
          }
        }
      }
      if(row === 10){
        for(let i = row-1; i <= row; i++){
          let positionValue
          for(let j = position-1; j <= position; j++){
            if(i === row && j === position){
              continue;
            }
            positionValue = i / 10 + j / 100
            cellsArray.push(positionValue.toFixed(2))
          }
        }
      } else{
        for(let i = row-1; i <= row+1; i++){
          let positionValue
          for(let j = position-1; j <= position; j++){
            if(i === row && j === position){
              continue;
            }
            positionValue = i / 10 + j / 100
            cellsArray.push(positionValue.toFixed(2))
          }
        }
      }
    }else{
      for(let i = row-1; i <= row+1; i++){
        let positionValue
        for(let j = position-1; j <= position+1; j++){
          if(i === row && j === position){
            continue;
          }
          positionValue = i / 10 + j / 100
          cellsArray.push(positionValue.toFixed(2))
        }
      }
    }
    tile.adjacentCells = cellsArray
    return
  }

  //SETS A TILE AS A BOMB IF COORDINATES MACTH
  const setBomb = (tile, positionValue) => {
    let bombArray = randomNumberArray;
    let isBomb = false;
    bombArray.forEach(bomb => {
      if(parseFloat(bomb).toFixed(2) === positionValue.toFixed(2)){
        isBomb = true
        return
      }
    })
    return isBomb
  }

  //GENERATE TILE VALUE BASED ON ADJACENT BOMBS
  const checkAdjacents = () => {
    console.log(gameBoard)
    console.log(randomNumberArray)
    gameBoard.forEach(row => row.forEach(tile  => tile.adjacentCells.forEach(cell => randomNumberArray.forEach(value => {
      if(cell === value){
        tile.adjacentBombs++
        if(tile.cellCoords > 0.89){
          console.log(tile.adjacentCells)
          console.log(randomNumberArray)
        }
      }
    }))))
  }

  //GENERATE ARRAY OF RANDOM NUMBERS FOR BOMB PLACEMENT
  useEffect(() => {
    let randomArray = [];
    let randomValue
    let min = Math.ceil(1)
    let max = Math.floor(11)
    for(let i = 0; randomArray.length < 10; i++){
      let randomRow = Math.floor(Math.random() * (max - min) + min)
      let randomPosition = Math.floor(Math.random() * (max - min) + min)
      randomValue = (randomRow / 10 + randomPosition / 100);
      if(randomArray.includes(randomValue.toFixed(2))){
        continue;
      }
      randomArray.push(randomValue.toFixed(2));
      //console.log(randomArray)
      randomValue = 0;
    }
    setRandomNumberArray(randomArray);
    return
  }, [])

  //GENERATES PLAYFIELD WITH BOMBS
  useEffect(() => {
    if(randomNumberArray.length === 10){
      let tempBoard = []
      let tempRow = []
      let targetBombs = bombsToPlay
      let tempBombCount = 0
      let rowCount = 0
      let tempTile
      for(let i = 0; i < 10; i++){
        rowCount++
        for(let j = 0; j < 10; j++){
          let positionValue = rowCount/10 + j/100
          tempTile = {
            ...tile,
            cellCoords: positionValue.toFixed(2),
            row: rowCount,
            position: j
          }
          setAdjacentCells(tempTile)
          if(tempBombCount < targetBombs){
            tempTile.isBomb = setBomb(tempTile, positionValue)
            if(tempTile.isBomb){
              tempBombCount++
              console.log('entered loop')
            }
          }
          console.log(tempTile.isBomb)
          tempRow.push(tempTile)
        }
        tempBoard.push(tempRow)
        tempRow = [];
    }
    setGameBoard(tempBoard);
  }
  },[randomNumberArray])


    //random number between 1 and 10, twice
    //covert to decimal (tens and hundreths) and add
    //compare to other values
    //if unique, push to randomNumberArray
      //decrement bomb count

  return (
    <>
    {gameBoard.length ?
      <div className="App">
      <h1>Minesweeper</h1>
      <div className='board-div'>

      <div className='game-board'>
      {checkAdjacents()}
      {gameBoard.map((row, index) => <div className='row' key={index}>{row.map((tile, index) => <div className='tile' key={index + 10}>
        {tile.isBomb ? '%' : tile.adjacentBombs}
        {/* {tile.clicked ? (tile.isBomb ? 8 : tile.adjacentBombs): <div className='not-clicked'></div>} */}
        </div>)}
        </div>
      )}
      </div>
      </div>
      </div>
      :
      <p>Loading...</p>
    }
    </>
  );
}

export default App;
