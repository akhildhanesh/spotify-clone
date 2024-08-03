import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/frontend-assets/assets";

export const PlayerContext = createContext()

const PlayerContextProvider = ({ children }) => {

    const audioRef = useRef()
    const seekBg = useRef()
    const seekBar = useRef()

    const [track, setTrack] = useState(songsData[0])
    const [playStatus, setPlayStatus] = useState(false)
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    })

    const play = () => {
        audioRef.current.play()
        setPlayStatus(true)
    }

    const pause = () => {
        audioRef.current.pause()
        setPlayStatus(false)
    }

    const previous = () => {
        if (track.id) {
            setTrack(songsData[track.id - 1])
        }
    }

    const next = () => {
        if (track.id < songsData.length - 1) {
            setTrack(songsData[track.id + 1])
        }
    }

    const seekSong = e => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration)
    }

    // const playWithId = async id => {
    //     await setTrack(songsData[id])
    //     audioRef.current.play()
    //     setPlayStatus(true)
    // }

    useEffect(() => {
        audioRef.current.play()
        setPlayStatus(true)
    }, [track])

    const playWithId = id => {
        setTrack(songsData[id])
    }

    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%"
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                })
            }
        }, 1000)
    }, [audioRef])

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider