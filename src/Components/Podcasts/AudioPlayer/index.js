import React, { useEffect, useRef, useState } from 'react';
import "./style.css";
import {Faplay, FaPause, FaVolumeUp, FaVolmueMute, FaPlay, FaVolumeMute} from "react-icons/fa"


function AudioPlayer({audiosrc,image}) {
  const audioRef=useRef()
  const [duration,setDuration]=useState(0);
  const [currentTime,setCurrentTime]=useState(0)
  const [volume,setVolume]=useState(1)
  const [isPlaying,setIsPlaying]=useState(true);
  const [isMute,setIsMute]=useState(false);

  const handleDuration=(e)=>{
    setCurrentTime(e.target.value)
    audioRef.current.currentTime=(e.target.value);
  }
  const togglePlay=()=>{
    if(isPlaying){
      setIsPlaying(false)
    }else{
      setIsPlaying(true);
    }
  }
  const toggleMute=()=>{
    if(isMute){
      setIsMute(false)
    }else{
      setIsMute(true);
    }
  }
  const handleVolume=(e)=>{
    setVolume(e.target.value)
    audioRef.current.volume=e.target.value;

  }

  const formatTime=(time)=>{
    const minute=Math.floor(time/60);
    const seconds=Math.floor(time%69);
    return `${minute}:${seconds<10?"0":""}${seconds}`
  }

  useEffect(()=>{
    if(isPlaying){
      audioRef.current.play();
    }else{
      audioRef.current.pause();
    }
  },[isPlaying])

  useEffect(()=>{
    if(!isMute){
      audioRef.current.volume=volume;
    }else{
      audioRef.current.volume=0;
    }
  },[isMute])
 
  useEffect(()=>{
    const audio=audioRef.current;
    audio.addEventListener("timeupdate",handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended",handleEnded);
    return()=>{
      audio.addEventListener("timeupdate",handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("ended",handleEnded);
    }
  },[]);

  const handleTimeUpdate=()=>{
    setCurrentTime(audioRef.current.currentTime);
  }
  const handleLoadedMetadata=()=>{
    setDuration(audioRef.current.duration);
  }
  const handleEnded=()=>{
    setCurrentTime(0);
    setIsPlaying(false);
  }

 

  return (
    <div className='custom-audio-player'>
      <img src={image} className='display-image-player'/>
      <audio ref={audioRef} src={audiosrc}/>
      <p className='audio-btn' onClick={togglePlay}>{isPlaying?<FaPause/>:<FaPlay/>}</p>
      <div className='duration-flex'>
        <p>
          {formatTime(currentTime)}
        </p>
        <input type='range' max={duration} value={currentTime} step={0.01} onChange={handleDuration} className='duration-range'/>
        <p>
          -{formatTime(duration-currentTime)}
        </p>
        <p className='audio-btn' onClick={toggleMute}>{!isMute?<FaVolumeUp/>:<FaVolumeMute/>}</p>
        <input type='range' value={volume} max={1} min={0} step={.01} onChange={handleVolume} className='volume-range'/>
      </div>
    </div>
  )
}
export default AudioPlayer