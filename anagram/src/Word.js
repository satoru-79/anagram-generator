import React from 'react'
import './App.css';

const Word = (value) => {
  return (
    <div className="word">{value.word.name}</div>
  )
}

export default Word