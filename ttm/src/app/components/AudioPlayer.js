'use client'
import styles from '../styles/AudioPlayer.module.css';
import React, {useState, useRef, useEffect} from 'react';

import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import {FaPlay} from "react-icons/fa";
import {FaPause} from "react-icons/fa";


const AudioPlayer = () => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // pass in as a prop.  Params are seconds
  const chapters = [
    {
      start: 0,
      end: 15
    },
    {
      start: 60,
      end: 75,
    },
  ]

  // references
  const audioPlayer = useRef();  // reference to our audio component
  const progressBar = useRef();  // reference to progress bar
  const animationRef = useRef(); // references the animation

  useEffect(()=> {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  const whilePlaying =() => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`);
    setCurrentTime(progressBar.current.value);
  }

  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value) - 30;
    changeRange();
  }

  const forwardThirty = () => {

    progressBar.current.value = Number(progressBar.current.value) + 30;

    changeRange();
  }

  return (
    <div className={styles.audioPlayer}>
      <audio ref={audioPlayer} src="https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/602fd246-0a4f-49eb-83e5-41dc1f15ed50/audio/9fc78e12-f322-41d9-8a1b-05cfb40b3c69/default_tc.mp3?nocache" preload="metadata"></audio>
      
      <button className={styles.forwardBackward} onClick={backThirty}><BsArrowLeftShort/> 30</button>
      
      <button onClick={togglePlayPause} className={styles.playPause}>
        { !isPlaying ? <FaPlay className={styles.play}/> : <FaPause /> } 
      </button>
      
      <button className={styles.forwardBackward} onClick={forwardThirty}>30 <BsArrowRightShort /></button>

      {/* current time */}
      <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

      {/* progress bar */}
      <div className={styles.progressBarWrapper}>
        <input type="range" className={styles.progressBar} defaultValue="0" ref={progressBar} onChange={changeRange}></input>
        {chapters.map((chapter, i) => {
          console.log('duration', duration);
          const leftStyle = chapter.start / duration * 100;
          const widthStyle = (chapter.end - chapter.start) * 0.2;
          // console.table({i, leftStyle, widthStyle});
          return(
            <div 
              key={i} 
              className={`${styles.chapter} ${chapter.start == 0 && styles.start} ${chapter.start == duration && styles.end}`}
              style={{
                '--left': `${leftStyle}%`,
                '--width': `${widthStyle}%`,
              }}
              ></div>
          )
        })}
        
      </div>

      {/* duration */}
      <div className={styles.duration}>{ (duration && !isNaN(duration)) && calculateTime(duration)}</div>
    </div>
  )
}

export {AudioPlayer}
