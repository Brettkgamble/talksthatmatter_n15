'use client'
import styles from '../styles/AudioPlayer.module.css';
import React, {useState} from 'react';

import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import {FaPlay} from "react-icons/fa";
import {FaPause} from "react-icons/fa";


const AudioPlayer = () => {

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  }

  return (
    <div className={styles.audioPlayer}>
      <audio src="https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/602fd246-0a4f-49eb-83e5-41dc1f15ed50/audio/9fc78e12-f322-41d9-8a1b-05cfb40b3c69/default_tc.mp3?nocache" preload="metadata"></audio>
      <button className={styles.forwardBackward}><BsArrowLeftShort/> 30</button>
      <button onClick={togglePlayPause} className={styles.playPause}>
        { isPlaying ? <FaPlay className={styles.play}/> : <FaPause /> } 
      </button>
      <button className={styles.forwardBackward}>30 <BsArrowRightShort /></button>

      {/* current time */}
      <div className={styles.currentTime}>0:00</div>

      {/* progress bar */}
      <div>
        <input type="range" className={styles.progressBar}></input>
      </div>

      {/* duration */}
      <div className={styles.duration}>2:49</div>
    </div>
  )
}

export {AudioPlayer}
