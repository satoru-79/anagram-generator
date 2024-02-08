import './App.css';
import WordList from "./WordList";
import CharList from "./CharList";
import {useState } from 'react';
import {v4 as uuidv4} from "uuid";

function App() {

    //--画面に表示する単語の配列を格納する変数--//
    const [words, setWords] = useState([]);

    //--入力された単語を１文字ずつ分割して保存する変数--//
    const [chars, setChars] = useState([]);

    //--絞り込み前の状態を保存するための変数--//
    const [copyWords , setCopyWords] = useState([]);

    //--１文字目の絞り込み後の状態を保存する変数--//
    const [sortedWords, setSortedWords] = useState([]);

    let Words = [];
    let a,b,c,d,e,f,g,h,i,j = 0
    let alphabet = [a,b,c,d,e,f,g,h,i,j]


    //--重複しない単語のみwordsに追加する関数--//
    const addWord = (word) => {
        if(Words.includes(word) === false) {
            setWords((prevWords) => [...prevWords,{id:uuidv4() , name:word}]);
            setCopyWords((prevWords) => [...prevWords,{id:uuidv4() , name:word}]);
        }
        Words.push(word);
    }

    //--使用した文字をcharsから削除する関数--//
    const deleteUsedChar = (prevChars,Index) => {
        return prevChars.filter(function (value,index,array) {
        return  index !== Index;    
    })
    };

    //--ソート時のcharsへの変更の関数--//
    const changeSort = (id,letter) => {

        //--1文字目ソート時の処理--//
        if (letter === 1) 
        {
            const newChars = [...chars]
            const unSortedChar = newChars.filter((char) => char.id !== id);
            unSortedChar.forEach((char) => 
            {
                char.sorted = false;
                char.sorted2 = false;
            });
            const sortedChar = newChars.find((char) => char.id === id);
            sortedChar.sorted = !(sortedChar.sorted);
            setChars(newChars);
        }

        //--2文字目ソート時の処理--//
        else 
        {
            const newChars = [...chars];
            const unSortedChar = newChars.filter((char) => char.id !== id);
            unSortedChar.forEach((char) => char.sorted2 = false);
            const sortedChar = newChars.find((char) => char.id === id);
            sortedChar.sorted2 = !(sortedChar.sorted2);
            setChars(newChars);
        }
    }

    //--ソート時のwordsの変更の関数--//
    const sorting = (char,sorted,letter) => {
        const CopyWords = [...copyWords]

        //--ソート解除時の処理--//
        if (sorted === false) {
            if (letter === 0) {
                setWords(CopyWords);
                setSortedWords(CopyWords);
            } else {
                setWords(sortedWords);
            }

        //--ソート実行時の処理--//
        } else {

            //--1文字目ソートの処理--//
            if (letter === 0) {
                const newWords = CopyWords.filter((word) => word.name.charAt(letter) === char);
                setWords(newWords);
                setSortedWords(newWords);

            //--2文字目ソートの処理--//
            } else {
                const Words = [...sortedWords];
                const newWords = Words.filter((word) => word.name.charAt(letter) === char);
                setWords(newWords);
            }
        }
    }


    //--アナグラムを実行する関数--//
    const anagram =  (strlen,word,chars,i) => {
        let n = 0
        for(i = 0;i < strlen;i++)
        {
            let Chars = chars;
            let newWord = word + Chars[i]

            //--残り1文字の時以下を実行しループを抜ける--//
            if (strlen === 1) 
            {
                addWord(newWord);
                continue;
            }
            let newStrlen =strlen - 1;
            let newChars = deleteUsedChar(Chars,i)
            n += 1;

            //--文字数分再帰する--//
            anagram(newStrlen,newWord, newChars,alphabet[n])
        }
        
    }



  
  //--inputの値が変わるたびに更新される関数--//
  const makeAnagram = (e) => {
    setWords([]);
    setCopyWords([]);
    setSortedWords([]);
    const strlen = e.target.value.length;
    const str = e.target.value;

    //--文字列を一文字ずつに分割する--//
    setChars([]);
    for(let i=0;i <strlen;i++) {
      chars[i] = str.charAt(i);
      setChars((prevChars) => [...prevChars,{id:uuidv4(), name:chars[i], sorted:false, sorted2:false}])
    }

    //--アナグラムの実行--//
    if(strlen === 0){
      return 
    }

    //--8文字以内の時、アナグラムを実行する--//
    else if (strlen <= 8) {anagram(strlen,'',chars,alphabet[0]);}

    setSortedWords(words);

  }

  
  //---HTML部分---//
  return (
    <div>
        <header>
            <img src="anagramlogo.png" alt="" className='header-logo'/>
            <p  className='header-title'>アナグラムジェネレータ</p>
        </header>
        <div className='introduction'>
            <h3>入力した文字を並び替えた結果を表示します。</h3>
            <h3>処理の都合上、8文字以内でしか実行できません。</h3>
        </div>
        <div className='input-area'>
            <input  
            type='text'  
            onChange={(e) => {
              makeAnagram(e);                  
            }} 
            placeholder="文字を入力してください"/>
        </div>

        <div className='sort-area'>
            <div className='sort'>
                <h4>▶1文字目から絞り込み</h4>
                <CharList chars={chars} changeSort={changeSort} sorting={sorting} letter={1} />
            </div>
            <div className='sort'>
                <h4>▶2文字目から絞り込み</h4>
                <CharList chars={chars} changeSort={changeSort} sorting={sorting} letter={2}/>
            </div>
        </div>

        <div className='words-area'>
            <WordList words={words} />

            
    
        </div>
    </div>
    
  );
}

export default App;
