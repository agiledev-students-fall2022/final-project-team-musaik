import Albums from '../../components/Albums/Albums';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import UserNumbers from '../../components/UserNumber/UserNumbers'
import './styles.css'
import NavBar from '../../components/NavBar/NavBar';
import avi from "../../img/avi.png";
import placeHolder from '../../img/album.jpeg'
import React, {useEffect,useState} from 'react';
import axios from 'axios';
import SpotPlayer from '../../components/SpotPlayer';
import ClipLoader from "react-spinners/ClipLoader";


import FavArtists from '../../components/Albums/FavArtists';




function Profile() {
  const [loading, setLoad ]= useState(false)
  useEffect(() =>{
    setLoad(true)
    setTimeout(() => {
      setLoad(false)
    },750)
  }, [])

  // get Searched songs
  const [search, setSearch] = useState([]);
  useEffect(() => {
      axios.get('/api/getSearch')
          .then(res => {
            setSearch([...search,...res.data])
          });
  }, []);
  // get recently played songs
  const [songs, setSongs] = useState([]);
  useEffect(() => {
      axios.get('/api/get_saved')
          .then(res => {
            console.log(res.data)
            setSongs([...songs,...res.data])
          });
  }, []);
  // get user name
  const [user1, setUser1] = useState([]);
  useEffect(() => {
      axios.get('/api/user_info')
          .then(res => {
            setUser1([user1,[res.data['display_name']]])
          });
  }, []);
  // get user follower info
  const [followers, setFollowers] = useState([]);
  useEffect(() => {
      axios.get('/api/user_info')
          .then(res => {
            setFollowers([followers,res.data['followers']['total']])
          });
  }, []);
  // get user profile image
  const [profile, setProfile] = useState([]);
    useEffect(() => {
      axios.get('/api/user_info')
          .then(res => {
            setProfile([profile,res.data['images'][0]['url']])
          });
  }, []);

  useEffect(() => {
  }, [profile])


  const getUser = async () => {
    const user = await axios.get('/user');
    return user.data;
};


const [Track, SetTrack] = useState([]);

    useEffect(() => {
      axios.get('/api/track')
          .then(res => {
            SetTrack([res.body])
          });
  }, []);

  useEffect(() => {
  }, [Track])

  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [trackUri, setTrackUri] = useState("spotify:track:4iV5W9uYEdYUVa79Axb7Rh"); // default track

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

  return (
    <div className="app">
    {
      loading ? 
      <div className="appName">
      <ClipLoader
        color={"#ADD8E6"}
        loading={loading}
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
      :
    <div className="Profile">
        <UserAvatar text={user1[1]} image={profile[1]} />
        <UserNumbers followers={followers[1]} following={followers[1]}/>

        <div className='Album-Card'>
          <FavArtists text={"Favorite Artists"} image={placeHolder} label = {''}/>
          <Albums text={"Recently Played"} click={(song) => setTrack(song.id)} songs={songs}/>
        </div>
        <div className="Player-Container">
            <SpotPlayer accessToken={accessToken} trackUri={trackUri} />
        </div>
       <NavBar />
    </div>
    }
    </div>
  );
}

export default Profile;