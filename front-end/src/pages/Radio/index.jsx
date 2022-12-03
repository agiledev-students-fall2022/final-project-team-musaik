import NavBar from '../../components/NavBar/NavBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Bubble from '../../components/Bubble';
import SpotPlayer from '../../components/SpotPlayer';
import './index.css';


function Radio(props) {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [trackUri, setTrackUri] = useState("spotify:track:4iV5W9uYEdYUVa79Axb7Rh"); // default track
    const [currentSession, setCurrentSession] = useState(null); // currently joined session
    const [sessions, setSessions] = useState([]); // top sessions in bubbles

    const [playlists, setPlaylists] = useState([]);
    const [open, setOpen] = useState(false);
    const [progressMs, setProgressMs] = useState(0);

    const getUser = async () => {
        const user = await axios.get('/user');
        return user.data;
    };
    
    useEffect(() => {
        getUser().then((user) => {
            setUser(user);
            setAccessToken(user.access_token);
        });
    }, []);

    // set the track to play
    const setTrack = (trackId) => {
        setTrackUri("spotify:track:" + trackId);
    }

    // set the track offset to start playing (ms)
    const setOffset = (progressMs) => {
        setProgressMs(progressMs);
    }

    const setPlaylingList = (playlistId) => {
        setOpen(!open);
        axios.post('/sessions/create-session', {
            playlistId: playlistId,
        }).then((res) => {
            setCurrentSession(res.data);
        });
    }

    // change currently playing session when each session is clicked
    const changeCurrentSession = (session) => {
        setCurrentSession(session);
        setTrack(session.playlist[0]);
        // setOffset(0);
        setOffset(session.progressMs);
    }

    //open dropdown
    const openDropdown = () => {
        setOpen(!open);
        console.log(playlists);
    }

    // get top sessions
    useEffect(() => {
        axios.get('/sessions/top-sessions')
            .then(res => {
                setSessions(res.data.sessions);
            });
    }, []);
    
    // get user's playlists
    useEffect(() => {
        axios.get('/sessions/playlist-search')
            .then(res => {
                const resLists = res.data;
                setPlaylists(resLists);
            });
    }, []);
    return (
        <>
        <div>
            <button className="dropdown"onClick={openDropdown}>Create a Session</button>
                {open ? (
                    <ul className="dropdown-menu">
                        {playlists.map((playlist) => (
                            <li className="dropdown-menu-item" onClick={() => setPlaylingList(playlist.id)}>
                                <img src={playlist.img} />
                                <p>{playlist.name}</p>
                            </li>
                        ))}
                    </ul>
                ) : null}
        </div>
        <div className="Radio">
            {/* radio bubbles */}
            {sessions.map((session, i) => (
                <Bubble className={`bubble_${i+1}`} click={() => changeCurrentSession(session)} session={session} id={i+1}/>
            ))}
        </div>
        <div className="Player-Container">
            <SpotPlayer accessToken={accessToken} trackUri={trackUri} offset={progressMs}/>
        </div>
        <NavBar/>
        </>
    );
} 

export default Radio