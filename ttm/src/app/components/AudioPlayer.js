'use client'
import React from 'react';

import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import {FaPlay} from "react-icons/fa";
import {FaPause} from "react-icons/fa";


const AudioPlayer = () => {

  const [isPlaying] = React.useState(false);

  return (
    <div>
      <audio src="https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/602fd246-0a4f-49eb-83e5-41dc1f15ed50/audio/9fc78e12-f322-41d9-8a1b-05cfb40b3c69/default_tc.mp3?nocache" preload="metadata"></audio>
      <button><BsArrowLeftShort/> 30</button>
      <button>
        { isPlaying ? <FaPlay /> : <FaPause /> } 
      </button>
      <button>30 <BsArrowRightShort /></button>

      {/* current time */}
      <div>0:00</div>

      {/* progress bar */}
      <div>
        <input type="range"></input>
      </div>

      {/* duration */}
      <div>2:49</div>
    </div>
  )
}

export {AudioPlayer}
