import React from 'react'
import Button from '../../Common/Button';

function  EpisodeDeatils({index,title,description,audioFile,onClick}){
  return (
    <div style={{width:"100%" , marginLeft:"1rem" ,marginTop:"-1rem"}}>
        <h1 style={{textAlign:"left",marginBottom:"-1rem" ,marginLeft:"-1rem"}}>{index}. {title}</h1>
        <p style={{marginLeft:"1rem",marginBottom:"-.5rem"}} className='podcast-description'>{description}</p>
        <Button text={"Play"} classes="btns" onClick={()=>onClick(audioFile)} width={"200px"}/>
    </div>
  )
}

export default EpisodeDeatils;