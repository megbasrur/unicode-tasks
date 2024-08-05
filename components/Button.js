import "./Button.css";


export const Button=({symbol, color, handleClick})=>{
    return (
        <div onClick={()=>handleClick(symbol)} className="button-container" style={{backgroundColor: color}}>{symbol}</div>
    )
}

