import './Albums.css';
import placeHolder from '../../img/album.jpeg'
import {useState, useEffect} from "react"

function Albums({text, songs, click}){
    
    return(
        <div className='Carousel'>
            { 
                songs.length >= 3 ?
                <>
                    <h2 className='Category-Name'>{text}</h2>
                    <img onClick={() => click(songs[0])} src={songs[0]['image']}  alt="Album PlaceHolder" className='Album-PlaceHolder'/>
                    <img onClick={() => click(songs[1])} src={songs[1]['image']}  alt="Album PlaceHolder" className='Album-PlaceHolder'/>
                    <img onClick={() => click(songs[2])} src={songs[2]['image']}  alt="Album PlaceHolder" className='Album-PlaceHolder'/>
                </>
                : <div/> 
            }
        </div>
    )
}

export default Albums