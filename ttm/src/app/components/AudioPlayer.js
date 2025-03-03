import React from 'react'

const AudioPlayer = () => {
  return (
    <div>
      <audio src="https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/602fd246-0a4f-49eb-83e5-41dc1f15ed50/audio/9fc78e12-f322-41d9-8a1b-05cfb40b3c69/default_tc.mp3?nocache" preload="metadata"></audio>
      <button>back 30</button>
      <button> play / pause</button>
      <button>forward 30</button>

      {/* current time */}
      <div>0:00</div>
    </div>
  )
}

export {AudioPlayer}
