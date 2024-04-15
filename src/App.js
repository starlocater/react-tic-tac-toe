import "./App.css"
import Board from "./components/Board"
import { useState } from "react";

const App = () => {

  const [xIsNext, setXisNext] = useState(true); // 이게 vue에서 const xIsNext = ref(true); 와 동일함. vue에서 ref가 react의 state다.
  const [history, setHistory] = useState([ {squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);

  const judgeWinner = (squares) => {
    const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
    ];

    for(let i=0; i < lines.length; i++) {
      const [a,b,c] = lines[i]
      if (
        squares[a]
        && squares[a] === squares[b]
        && squares[b] === squares[c]
      ) {
        return squares[a];
      }
    }
  };
  const current = history[stepNumber];
  const winner = judgeWinner(current.squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const handleClick = (i) => {
   
    if(!winner) {
      const newHistory = history.slice(0, stepNumber + 1);
      const newCurrent = newHistory[newHistory.length -1];
      const newSquares = newCurrent.squares.slice();
      if(!newSquares[i]){
        newSquares[i] = xIsNext? 'X' : 'O';
        setHistory([...newHistory, { squares: newSquares }]);
        setXisNext(current => !current);
        setStepNumber(newHistory.length);
      } else {
        window.alert('You can not overwrite')
      }
    } else {
      window.alert('Game is over and the winner is ' + winner)
    }
  }



  const moves = history.map((step, move) => {
    const desc = move ?
    'Go to move #' + move :
    'Go to game start';
    return ( // jsx에서 <li> 혹은 <ol>과 같은 나열된 오브젝트는 key값을 반드시 줘야함.
      <li key={move}>
        <button className="move-button" onClick={ () => jumpTo(move) }>
          {desc}
        </button>
      </li>
    )
  })  //move는 index, step은 history에 들어있는 square[i]

  const jumpTo = (stepIndex) => {
    setStepNumber(stepIndex)
    setXisNext((stepIndex % 2) === 0);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)}/>
      </div>
      <div className="game-info">
        <div className='status'>
            {status}
        </div>
        <ol style={{listStyle: 'none'}}>
          {moves}
        </ol>
      </div>
    </div>
  );
} 

export default App;