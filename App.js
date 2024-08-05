import {useState} from "react";
import './App.css';
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import {evaluate} from "mathjs";

const App=()=>{

  const [text,setText]=useState("");
  const [result,setResult]=useState("");

  const addText=(symbol)=>{
    setText((text)=> [...text, symbol+""]);
  };
  const clearText=()=>{
    setText("");
    setResult("");
  }
  const calculateResult=()=>{
    const input=text.join("");
    setResult(parseFloat(evaluate(input)).toFixed(2));
  
  }
  const calculatePercent=()=>{
    const input=text.join("");
    setResult((evaluate(input)/100).toString());
  }

  const deleteText=(symbol)=>{
     setText((text)=>[text.slice(0,-1)]);
  }


  return (
    <div className="App">
      <div className="container">
         <Input text={text} result={result}/>
         <div className="row">
           <Button symbol="AC" color="rgb(38, 38, 40)" handleClick={clearText}/>
           <Button symbol="DEL" color="rgb(38, 38, 40)" handleClick={deleteText}/>
           <Button symbol="%" color="rgb(38, 38, 40)" handleClick={addText}/>
           <Button symbol="/" color="#ffa600" handleClick={addText}/>
         </div>
         <div className="row">
           <Button symbol="7" handleClick={addText}/>
           <Button symbol="8" handleClick={addText}/>
           <Button symbol="9" handleClick={addText}/>
           <Button symbol="*" color="#ffa600" handleClick={addText}/>
         </div>
         <div className="row">
           <Button symbol="4" handleClick={addText}/>
           <Button symbol="5" handleClick={addText}/>
           <Button symbol="6" handleClick={addText}/>
           <Button symbol="-" color="#ffa600" handleClick={addText}/>
         </div>
         <div className="row">
           <Button symbol="1" handleClick={addText}/>
           <Button symbol="2" handleClick={addText}/>
           <Button symbol="3" handleClick={addText}/>
           <Button symbol="+" color="#ffa600" handleClick={addText}/>
         </div>
         <div className="row">
           <Button symbol="0" handleClick={addText}/>
           <Button symbol="." handleClick={addText}/>
           <Button symbol="=" handleClick={calculateResult}/>
         </div>
      </div>
    </div>
  );
}

export default App;
