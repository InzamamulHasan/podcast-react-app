import React from "react";
import "./style.css"

let Button=(({text, onClick, disabled,classes,width})=>{
    return<div onClick={onClick} disabled={disabled} className={classes} style={{width:width}}>{text}</div>
})
export default Button;