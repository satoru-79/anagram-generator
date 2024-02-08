import React from 'react';
import Char from "./Char";

const CharList = ({chars,changeSort,sorting,letter}) => {
    if (chars.length <= 8)
    {
        if (letter === 1) 
        {
            return (
                chars.map((char) => <Char char={char} changeSort={changeSort} sorting={sorting}  letter={letter}/>)
            )
            
        } else 
        {
            const unSorted = chars.filter((char) => char.sorted === false);
            return (
                unSorted.map((char) => <Char char={char} changeSort={changeSort} sorting={sorting} letter={letter} />)
            )
        }
    }
}

export default CharList