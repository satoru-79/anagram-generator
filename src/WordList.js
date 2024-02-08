import React from 'react';
import Word from './Word';

const WordList = (words,error) => {
  const newWords = words.words;
  return newWords.map((value) => <Word word={value}  key={value.id} />); 
}

export default WordList