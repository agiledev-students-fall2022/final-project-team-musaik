import NavBar from '../../components/NavBar/NavBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Bubble from '../../components/Bubble';
import SpotPlayer from '../../components/SpotPlayer';
import './index.css';

function Radio(props) {
    const getUser = async () => {
        const user = await axios.get('/user');
        return user.data;
    };

    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [trackUri, setTrackUri] = useState("spotify:track:4iV5W9uYEdYUVa79Axb7Rh"); // default track
    const [currentSession, setCurrentSession] = useState(null); // currently joined session
    const [sessions, setSessions] = useState([]); // top sessions in bubbles

    useEffect(() => {
        getUser().then((user) => {
            setUser(user);
            setAccessToken(user.access_token);
            console.log("user", user);
        });
    }, []);

    // set the track to play
    const setTrack = (trackId) => {
        setTrackUri("spotify:track:" + trackId);
        console.log("trackUri", trackUri);
    }

    // change currently playing session when each session is clicked
    const changeCurrentSession = (session) => {
        setCurrentSession(session);
        setTrack(session.playlist[0].trackId);
    }

    // get top sessions
    useEffect(() => {
        axios.get('/top_sessions')
            .then(res => {
                setSessions(res.data)
                console.log(sessions)
            });
    }, []);
    
    return (
        <>
        <div className="Radio">
            {/* radio bubbles */}
            {sessions.map((session, i) => (
                <Bubble className={`bubble_${i+1}`} click={() => changeCurrentSession(session)} session={session} id={i+1}/>
            ))}
            {/* player on the bottom */}
           
        </div>
         <div className="Player-Container">
            <SpotPlayer accessToken={accessToken} trackUri={trackUri} />
        </div>
        <NavBar/>
        </>
    );
}

export default Radio