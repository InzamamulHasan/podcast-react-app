import React from 'react'
import { Link } from 'react-router-dom';
import "./style.css";
function PodcastCard({id,title,displayImage}) {
  return (
    <Link to={`/podcast/${id}`}>
    <div className='podcast-card' >
        <img src={displayImage} className='display-image-podcast'/>
        <p className='title-pod'>{title}</p>
    </div>
    </Link>
  )
}

export default PodcastCard;