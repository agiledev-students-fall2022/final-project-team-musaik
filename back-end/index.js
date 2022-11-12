require('dotenv').config({ path: 'config.env' });
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const session = require('express-session');

// database setup
//require('./db');
//const mongoose = require('mongoose');

const app = express();

//middleware
app.use(express.json());
const corsOptions = {
   optionsSuccessStatus: 200,
   credentials: true,
 }
app.use(cors(corsOptions));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    cookie: {
        secure: false,
    }
}))

// static files
const path = require("path");

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const api = require('./routes/api');
app.use('/sessions', api);
const playlists = require('./routes/pinPlaylistRoute');
app.use('/playlists', playlists);


// spotify api
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: 'http://localhost:8080/callback'
});

const scopes = [
    'user-read-private',
    'user-read-email',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-recently-played',
    'user-top-read',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-library-read',
    'user-library-modify',
    'user-follow-read',
    'user-follow-modify'
];

// base url
app.get('/', (req, res) => {
    console.log(req.session.user);
    if (req.session.user) {
        res.redirect('/home'); // redirect to home only if the user has logged in
    }
    else {
        res.redirect('/login'); // if not, redirect to login page
    }
});

// login
app.get('/auth', (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

// callback
app.get('/callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;

    if (error) {
        console.log('Callback Error:', error);
        res.redirect('/login');
        return;
    }

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            const access_token = data.body['access_token'];
            const refresh_token = data.body['refresh_token'];
            const expires_in = data.body['expires_in'];

            spotifyApi.setAccessToken(access_token);
            spotifyApi.setRefreshToken(refresh_token);

            req.session.user = {
                access_token: access_token,
                refresh_token: refresh_token
            };
        
            console.log('user:', req.session.user);
            res.redirect("/profile");
        })
});

// refresh
app.get('/refresh', (req, res) => {
    const refreshToken = req.session.user.refresh_token;
    spotifyApi.setRefreshToken(refreshToken);
    spotifyApi.refreshAccessToken().then(
        data => {
            req.session.user = {
                access_token: data.body.access_token,
                refresh_token: refreshToken,
            };
            res.send(req.session.user).status(200);
        }
    ).catch(
        err => {
            console.log(err);
            res.sendStatus(400);
        }
    );
});

const test = require('./routes/index.js')
app.get('/api/rec', (req, res) =>{
  const user = req.session.user;
    spotifyApi.setAccessToken(user.access_token);
   function getMyData() {
        (async () => {
          const me = await spotifyApi.getMe();
          getMyTopArtists()
        })().catch(e => {
          console.error(e);
        });
      }

    async function getMyTopArtists(){
        const data = await spotifyApi.getMyTopArtists()
        let topArtists = data.body.items;
        let myArtists = []
        for(let i=0; i<5;i++){
          myArtists.push(topArtists[i].id)
          
        }
        spotifyApi.getRecommendations({
            min_energy: 0.5,
            seed_artists: myArtists,
            min_popularity: 50
          })
        .then(function(data) {
          let recommendations = data.body;
          let top3 = []
          for(let i =0; i<3; i++){
                console.log(recommendations.tracks[i].href);

                top3.push(recommendations.tracks[i].album.images[0]['url'], recommendations.tracks[i].href)
          }
           res.json(top3)
        }, function(err) {
          console.log("Something went wrong!", err);
        });
    
      }
    getMyData();
})

app.get('/api/user_info', (req,res) =>{
  const user = req.session.user;
  
  spotifyApi.setAccessToken(user.access_token);
   spotifyApi.getMe()
  .then(function(data) {
    res.json(data.body)
  }, function(err) {
    console.log('Something went wrong!', err);
  });
})


app.get('/api/get_saved', (req, res) =>{
  const user = req.session.user;
  spotifyApi.setAccessToken(user.access_token);
   spotifyApi.getMyRecentlyPlayedTracks({
        limit : 5
      }).then(function(data) {
        let songs =[]
        let images  = []
        let song = data.body.items 
        for(let i=0; i<5;i++){
            //songs.push(song[i].track['album']['artists'][0].name) returns names of recently played
            // songs.push(song[i].track.name)
            images.push(song[i].track.album.images[0].url)
          }
          res.json(images)

    
      })
    
})



// refresh
app.get('/refresh', (req, res) => {
    const refreshToken = req.session.user.refresh_token;
    spotifyApi.setRefreshToken(refreshToken);
    spotifyApi.refreshAccessToken().then(
        data => {
            req.session.user = {
                access_token: data.body.access_token,
                refresh_token: refreshToken,
            };
            res.send(req.session.user).status(200);
        }
    ).catch(
        err => {
            console.log(err);
            res.sendStatus(400);
        }
    );
});

// get user
app.get('/user', (req, res) => {
    res.send(req.session.user).status(200);
});


  app.get('/top_artists', (req, res) => {
    const token = req.session.user.access_token;
 
    spotifyApi.setAccessToken(token);
    spotifyApi.getMyTopArtists({
      limit: 3,
      offset: 0,
      time_range: 'long_term'
    })
    .then(function(data) {
      let topArtists = data.body.items;
      res.send(topArtists);
    }, function(err) {
      console.log('Something went wrong!', err);
  })

 });

  app.get('/top_artists_pics', (req, res) => {
    const token = req.session.user.access_token;
 
    spotifyApi.setAccessToken(token);
    spotifyApi.getMyTopArtists({
      limit: 3,
      offset: 0,
      time_range: 'long_term'
    })
    .then(function(data) {
      let topArtists = data.body.items;
      let topArtistsPics=[]
      topArtists.forEach(function(artist, index) {
        topArtistsPics[index]=artist.images[0].url
      })
      res.send(topArtistsPics)
    }, function(err) {
      console.log('Something went wrong!', err);
  })

  });


if (process.env.NODE_ENV == 'production') {
    console.log(__dirname);
    app.use(express.static(path.join(__dirname, '../front-end/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../front-end', 'build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send(process.env.NODE_ENV);
    });
}
  
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
