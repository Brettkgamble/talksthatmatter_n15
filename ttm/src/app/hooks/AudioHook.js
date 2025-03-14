import { useState, useRef, useEffect } from "react";
import { useSearchParams } from 'next/navigation';

const useAudio = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [timeJump, setTimeJump] = useState(0);

    

    // references
    const audioPlayer = useRef();  // reference to our audio component
    const progressBar = useRef();  // reference to progress bar
    const animationRef = useRef(); // references the animation

    // grabbing metadata
    useEffect(()=> {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

    //end of file
    useEffect(()=> {
        if (Number(duration) >= 0 && Number(currentTime) === Number(duration)) {
            togglePlayPause();
            timeTravel(0);
        }
    },[currentTime]);

    useEffect(()=> {
        console.log('here')
        if (timeJump && timeJump > 0) {
            timeTravel(timeJump);
            setIsPlaying(true);
            play();
        }
    }, [timeJump])

       
    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    const play = () => {
        audioPlayer.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
    }

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            play();
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
        timeTravel(Number(progressBar.current.value) - 30);
    }

    const forwardThirty = () => {
        timeTravel(Number(progressBar.current.value) + 30);
    }

    const timeTravel = (newTime) => {
        progressBar.current.value = newTime;
        changeRange();
    }

    return {
        audioPlayer,
        backThirty,
        calculateTime,
        changeRange,
        currentTime,
        duration,
        forwardThirty,
        isPlaying,
        play,
        progressBar,
        setDuration,
        setTimeJump,
        timeTravel,
        togglePlayPause,
    }
}

export { useAudio };