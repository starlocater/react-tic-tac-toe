import React, { useState } from 'react'
import Sqaure from './Sqaure'
import "./Board.css"

//https://higher77.tistory.com/68 (constructor의 props와 super(props)에 대한 이해)

const Board = ({squares, onClick}) => {
  



  const renderSquare = (i) => {
    return <Sqaure value={ squares[i] } onClick={ () => onClick(i) } />
  }

  return (
    <div>
      <div className='board-wrapper'>
        <div className='board-row'>
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
        </div>
        <div className='board-row'>
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}            
        </div>
        <div className='board-row'>
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}            
        </div>
      </div>
    </div>
  )
}

export default Board