import './stationAlbums.css';
import album from './img/stationRec.jpg'

function Albums({text}){
    return(

        <div className='Row1'>
            <h1 className='Category-Name'>{text}</h1>
            <img src={album} alt="Album-album" className="Album-album"/>
            <img src={album} alt="Album-album" className="Album-album"/>
            <img src={album} alt="Album-album" className="Album-album"/>
        </div>
    )
}

export default Albums