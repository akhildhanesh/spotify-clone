import React from 'react'
import Navbar from './Navbar'
import { albumsData, songsData } from '../assets/frontend-assets/assets'
import AlbumItems from './AlbumItems'
import SongItems from './SongItems'

const DisplayHome = () => {
    return (
        <>
            <Navbar />
            <div className='my-5 font-bold text-2xl'>
                <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
                <div className='flex overflow-auto'>
                    {
                        albumsData.map((item, i) => <AlbumItems key={i} {...item} />)
                    }
                </div>            
            </div>
            <div className='my-5 font-bold text-2xl'>
                <h1 className='my-5 font-bold text-2xl'>Today's biggest hit</h1>
                <div className='flex overflow-auto'>
                    {
                        songsData.map((item, i) => <SongItems key={i} {...item} />)
                    }
                </div>            
            </div>
        </>
    )
}

export default DisplayHome