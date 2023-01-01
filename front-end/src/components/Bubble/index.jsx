import axios from 'axios'
import { useEffect, useState } from 'react';
import './index.css'

function Bubble({session, id, click}){
    /*
    session is a json containing info about each radio session
    */
    const currentTrackId = session.playlist[0]; // currently playing track of the session
    const hostId = session.host;
    const [currentTrack, setTrack] = useState(null); // get track info using spotify api
    useEffect(() => {
        axios.get('/api/track', { params: { track_id: currentTrackId } }).then(res => {
            setTrack(res.data)
        });
    }, [currentTrackId]);


    return (
        <div>
            {
                currentTrack != null 
                ? 
                    <div onClick={click} className={`bubble bubble-${id}`} style={{backgroundImage:`url(${currentTrack['album']['images'][0]['url']})`}}>
                        <p className='host'>@{hostId} is playing</p>
                        <p className='track-title'>{currentTrack['name']}</p>
                        <p className='track-artist'>by {currentTrack['artists'][0]['name']}</p>
                    </div>
                : <div/>
            }
        </div>
    );
}

export default Bubble