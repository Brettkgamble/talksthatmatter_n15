'use client'
import { useSearchParams } from 'next/navigation';
import styles from '../styles/AudioPlayer.module.css';
import React, { useEffect } from 'react';
import { useAudio } from '../hooks/AudioHook';

import PropTypes from "prop-types";

import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import {FaPlay} from "react-icons/fa";
import {FaPause} from "react-icons/fa";

const AudioPlayer = ({ chapters, track }) => {

  const searchParams = useSearchParams();
  let timeJump = searchParams.get('jump');

  const {
    audioPlayer,
    backThirty,
    calculateTime,
    changeRange,
    currentTime,
    duration,
    forwardThirty,
    isPlaying,
    progressBar,
    setTimeJump,
    togglePlayPause,
  } = useAudio();

  useEffect(() => {
    setTimeJump(timeJump);
  }, [timeJump])
 
  return (
    <div className={styles.audioPlayer}>
      <audio ref={audioPlayer} src={track} preload="metadata"></audio>
      
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
            const leftStyle = chapter.start / duration * 100;
            // TODO:  Alter width based on duration.  100% multiplier is way to big for anything longer than 600 seconds
            const widthStyle = (chapter.end - chapter.start) * 0.2;
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

AudioPlayer.PropTypes ={
  chapters: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number
  })),
  timeJump: PropTypes.number,
  track:PropTypes.string.isRequired
}

AudioPlayer.defaultProps = {
  chapters: [],
  timeJump: 0,
}



export {AudioPlayer}
