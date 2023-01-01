import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Albums from '../../components/Albums/Albums';
import placeHolder from '../../img/album.jpeg';
import './index.css'
import RadioMatch from '../../components/RadioMatch';
import {useEffect,useState} from 'react';
import axios from 'axios';
import SpotPlayer from '../../components/SpotPlayer';
import ClipLoader from "react-spinners/ClipLoader";


function Home() {

  const [loading, setLoad ]= useState(false)

  useEffect(() =>{
    setLoad(true)

    setTimeout(() => {
      setLoad(false)

    },750)
  }, [])

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
            setSongs([...songs,...res.data])
          });
  }, []);
  // get recommendations
  const [recs, setRecs] = useState([]);
  const [lists, setLists] = useState([]);
  // get playlists
  useEffect(() => {
    axios.get('/playlists/pin-playlists')
      .then(res => {
        setLists([...lists,...res.data.playlists]);
      })
  }, []);

  useEffect(() => {
      axios.get('/api/rec')
          .then(res => {
            setRecs([...recs,...res.data])
          });
  }, []);


  const getUser = async () => {
    const user = await axios.get('/user');
    return user.data;
  };

  const [profile, setProfile] = useState([]);
  useEffect(() => {
      axios.get('/api/user_info')
          .then(res => {
            setProfile([profile,res.data['images'][0]['url']])
          });
  }, []);

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

  const setPlayList = (playlistId) => {
    setTrackUri("spotify:playlist:" + playlistId);
  }
  console.log(recs);

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
    <>
    <div className="Home">
      <div className="home-content">
        {
          recs.length >= 5 ?
          <RadioMatch img1={profile[1]} img2={recs[4]['image']} />
          : <div/>
        }
        <Albums text={"Playlists"} click={(playlist) => setPlayList(playlist.id)} songs={lists} />
        <Albums text={"Recommendations Based on Your Taste"} click={(song) => setTrack(song.id)} songs={recs} />
      </div>

      <div className="Player-Container">
          <SpotPlayer accessToken={accessToken} trackUri={trackUri} />
      </div>
    </div><NavBar /></> }
    </div>
  );
}

export default Home;

