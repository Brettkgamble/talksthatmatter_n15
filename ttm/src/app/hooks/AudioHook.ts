import { useState, useRef, useEffect, useCallback } from "react";

const useAudio = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [timeJump, setTimeJump] = useState(0);

    // references
    const audioPlayer = useRef<HTMLAudioElement>(null);  // reference to our audio component
    const progressBar = useRef<HTMLInputElement>(null);  // reference to progress bar
    const animationRef = useRef<number>(null); // references the animation

    const changePlayerCurrentTime = useCallback(() => {
        progressBar.current!.style.setProperty(
            '--seek-before-width',
            `${(Number(progressBar.current!.value) / duration) * 100}%`
        );
        setCurrentTime(Number(progressBar.current!.value));
    }, [duration]);

    const whilePlaying = useCallback(() => {
        progressBar.current!.value = audioPlayer.current!.currentTime.toString();
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    }, [changePlayerCurrentTime]);

    const play = useCallback(() => {
        audioPlayer.current!.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
    }, [whilePlaying]);

    const changeRange = useCallback(() => {
        audioPlayer.current!.currentTime = Number(progressBar.current!.value);
        changePlayerCurrentTime();
    }, [changePlayerCurrentTime]);


    const timeTravel = useCallback((newTime: number) => {
        progressBar.current!.value = newTime.toString();
        changeRange();
    }, [changeRange]);

    const togglePlayPause = useCallback(() => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (prevValue) {
            audioPlayer.current!.pause();
        } else {
            play();
            cancelAnimationFrame(animationRef.current!);
        }
    }, [isPlaying, play]);

    // grabbing metadata
    useEffect(()=> {
        const seconds = Math.floor(audioPlayer.current!.duration);
        setDuration(seconds);
        progressBar.current!.max = seconds.toString();
    }, [audioPlayer?.current?.onloadedmetadata, audioPlayer?.current?.readyState]);

    useEffect(()=> {
        timeTravel(timeJump);
    }, [timeJump, timeTravel])

    //end of file
    useEffect(()=> {
        if (Number(duration) >= 0 && Number(currentTime) === Number(duration)) {
            togglePlayPause();
            timeTravel(0);
        }
    },[currentTime, duration, timeTravel, togglePlayPause]);
       
    const calculateTime = (secs:number) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    const backThirty = () => {
        timeTravel(Number(progressBar.current!.value) - 30);
    }

    const forwardThirty = () => {
        timeTravel(Number(progressBar.current!.value) + 30);
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