import "./Input.css";

export const Input= ({text,result})=>{
    return(
        <div className="input-container">
            <div className="result">
                <h1>{result}</h1>
            </div>
            <div className="text">
                <h1>{text}</h1>
            </div>
        </div>
    )
}