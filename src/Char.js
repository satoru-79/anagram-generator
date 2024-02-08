import React from 'react'



const Char = ({char,changeSort,sorting,letter}) => {

    const handleCharClick = () => {   
        changeSort(char.id,1);
        sorting(char.name,char.sorted,0);
    };

    const handleCharClick2 = () => {   
        changeSort(char.id,2);
        sorting(char.name,char.sorted2,1);
    };

    if (letter === 1) 
    {
        if(char.sorted === false) {
            return (
                <div className='char' onClick={handleCharClick}>{char.name}</div>
            )
        } else {
            return (
                <div className='sorted' onClick={handleCharClick}>{char.name}</div>
            )
        }
    } else 
    {
        if(char.sorted2 === false) {
            return (
                <div className='char' onClick={handleCharClick2}>{char.name}</div>
            )
        } else {
            return (
                <div className='sorted' onClick={handleCharClick2}>{char.name}</div>
            )
        }
    }
     

}

export default Char