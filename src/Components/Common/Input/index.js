import React from "react";
import "./style.css"
let InputComponents=({state,setState,required,type,placeholder})=>{
    return(
        <input type={type} placeholder={placeholder} onChange={(e)=>{setState(e.target.value)}} required={required} value={state} className="custom-input"/>
    )
}
export default InputComponents;