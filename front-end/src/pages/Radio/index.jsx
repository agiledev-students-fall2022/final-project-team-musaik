import NavBar from '../../components/NavBar/NavBar';
import cover_one from '../../img/bubblecover1.jpeg'
import cover_two from '../../img/bubblecover2.jpeg'
import cover_three from '../../img/bubblecover3.jpg'
import cover_four from '../../img/bubblecover4.png'
import cover_five from '../../img/bubblecover5.jpeg'
import cover_six from '../../img/bubblecover6.jpg'
import cover_seven from '../../img/bubblecover7.jpg'
import cover_eight from '../../img/bubblecover8.jpg'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Bubble from '../../components/Bubble';
import SpotPlayer from '../../components/SpotPlayer';
import './index.css';

function Radio() {
    const getUser = async () => {
        const user = await axios.get('/user');
        return user.data;
    };

    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [trackUri, setTrackUri] = useState("");

    useEffect(() => {
        getUser().then((user) => {
            setUser(user);
            setAccessToken(user.access_token);
            console.log("user", user);
        });
    }, []);

    const setTrack = () => {
        setTrackUri("spotify:track:4iV5W9uYEdYUVa79Axb7Rh");
        console.log("trackUri", trackUri);
    }

    // get top six sessions
    
    
    return (
        <>
        <button onClick={setTrack}>CLICK ME</button>
        <div className="Radio">
            <Bubble img={cover_one} id='1' />
            <Bubble img={cover_two} id='2' />
            <Bubble img={cover_three} id='3' />
            <Bubble img={cover_four} id='4' />
            <Bubble img={cover_five} id='5' />
            <Bubble img={cover_six} id='6' />

            {/* <div className="bubble_div" style = {{display: 'flex', flexDirection: 'column'}}>
            <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center',margin: '3vh 0 1vh 0'}}>
                <div className="float-child">
                    <div className="bubble_one">
                        <img style={{height: '100%', width: '100%', resize: 'contain'}} src={cover_one} alt="Cover 1"/>
                    </div>
                </div>
                <div className="float-child">
                    <div className="bubble_two">
                        <img style={{height: '100%', width: '100%', resize: 'contain'}} src={cover_two} alt="Cover 2"/>
                    </div>
                </div>
            </div>
            <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '0 8% 1vh 0'}}>
                <div className="float-child">
                    <div className="bubble_three">
                        <img style={{height: '100%', width: '100%', resize: 'contain'}} src={cover_three} alt="Cover 3"/>
                    </div>
                </div>
                <div className="float-child">
                    <div className="bubble_four">
                        <img style={{height: '100%', width: '100%', resize: 'contain'}} src={cover_four} alt="Cover 4"/>
                    </div>
                </div>
            </div>
            <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '0 0 1vh 6%'}}>
                <div className="float-child">
                    <div className="bubble_five">
                        <img style={{height: '100%', width: '100%', resize: 'contain'}} src={cover_five} alt="Cover 5"/>
                    </div>
                </div>
                <div className="float-child">
                    <div className="bubble_six">
                        <img style={{height: '100%', width: '100%', resize: 'contain'}} src={cover_six} alt="Cover 6"/>
                    </div>
                </div>
            </div>
            <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginRight: '7%'}}>
                <div className="float-child">
                    <div className="bubble_seven">
                        <img style={{height: '100%', width: '100%', resize: 'contain'}} src={cover_seven} alt="Cover 7"/>
                    </div>
                </div>
                <div className="float-child">
                    <div className="bubble_eight">
                        <img style={{height: '100%', width: '100%', resize: 'contain'}} src={cover_eight} alt="Cover 8"/>
                    </div>
                </div>
                </div>    
            </div> */}
            <div className="Player-Container">
                <SpotPlayer accessToken={accessToken} trackUri={trackUri} />
            </div>
            <NavBar/>
        </div>
        </>
    );
}

export default Radio