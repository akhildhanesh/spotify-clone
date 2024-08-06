import { createContext, useEffect, useRef, useState } from "react";
// import { songData } from "../assets/frontend-assets/assets";
import axiosInstance from "../api/axiosInstance";

export const PlayerContext = createContext()

const PlayerContextProvider = ({ children }) => {
    const audioRef = useRef()
    const seekBg = useRef()
    const seekBar = useRef()

    const [songData, setSongData] = useState([])
    const [albumData, setAlbumData] = useState([])

    const [track, setTrack] = useState(null)
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

    const fetchSongData = () => {
        axiosInstance.get('/song/list')
            .then(data => data.data.songs)
            .then(data => {
                setSongData(data)
                setTrack(data[0])
            })
    }

    const fetchAlbumData = () => {
        axiosInstance.get('/album/list')
            .then(data => data.data.albums)
            .then(data => {
                setAlbumData(data)
            })
    }

    useEffect(() => {
        fetchSongData()
        fetchAlbumData()
    }, [])


    const play = () => {
        audioRef.current.play()
        setPlayStatus(true)
    }

    const pause = () => {
        audioRef.current.pause()
        setPlayStatus(false)
    }

    const previous = () => {
        if (track._id) {
            const songIndex = songData.findIndex(item => item._id === track._id)
            if (songIndex) {
                setTrack(songData[songIndex - 1])
            }
        }
    }

    const next = () => {
        const songIndex = songData.findIndex(item => item._id === track._id)
        if (songIndex < songData.length - 1) {
            setTrack(songData[songIndex + 1])
        }
    }

    const seekSong = e => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
    }

    const playWithId = async id => {
        const song = songData.find(item => item._id === id)
        setTrack(song)
    }

    useEffect(() => {
        if (track?.file) {
            audioRef.current.play()
            setPlayStatus(true)
        }
    }, [track])

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
        seekSong,
        songData,
        albumData
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider