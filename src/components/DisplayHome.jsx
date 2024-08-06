import React, { useContext } from 'react'
import Navbar from './Navbar'
import { PlayerContext } from '../context/PlayerContext'
import AlbumItems from './AlbumItems'
import SongItems from './SongItems'

const DisplayHome = () => {
    const { songData, albumData } = useContext(PlayerContext)

    return (
        <>
            <Navbar />
            <div className='my-5 font-bold text-2xl'>
                <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
                <div className='flex overflow-auto'>
                    {
                        albumData.map((item, i) => <AlbumItems key={i} {...item} />)
                    }
                </div>            
            </div>
            <div className='my-5 font-bold text-2xl'>
                <h1 className='my-5 font-bold text-2xl'>Today's biggest hit</h1>
                <div className='flex overflow-auto'>
                    {
                        songData.map((item, i) => <SongItems key={i} {...item} />)
                    }
                </div>            
            </div>
        </>
    )
}

export default DisplayHome