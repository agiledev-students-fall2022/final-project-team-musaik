const express = require("express") 
const app = express();

const port = process.env.PORT || 8080;

var cors = require("cors");


var SpotifyWebApi = require('spotify-web-api-node');

// This file is copied from: https://github.com/thelinmichael/spotify-web-api-node/blob/master/examples/tutorial/00-get-access-token.js

const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
  ];
  
// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId:'916ccfa1c6494c258979b38d9a540ea8',
    clientSecret:'463201981ff0483aa5361b4d5039113b',
    redirectUri: 'http://localhost:9000/callback/'
  });
  
  app.use(cors());

  app.listen(port, () => console.log("Backend server live on " + port));

  app.get("/", (req, res) => {
    res.send({ message: "We did it!" });
  });


  app.get('/login', (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
  });
  
  app.get('/callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;
  
    if (error) {
      console.error('Callback Error:', error);
      res.send(`Callback Error: ${error}`);
      return;
    }
  
    spotifyApi
      .authorizationCodeGrant(code)
      .then(data => {
        const access_token = data.body['access_token'];
        const refresh_token = data.body['refresh_token'];
        const expires_in = data.body['expires_in'];
        token = access_token
  
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);
  
        console.log('access_token:', access_token);
        console.log('refresh_token:', refresh_token);
  
        console.log(
          `Sucessfully retreived access token. Expires in ${expires_in} s.`
        );
        res.send('Success! You can now close the window.');
  
        setInterval(async () => {
          const data = await spotifyApi.refreshAccessToken();
          const access_token = data.body['access_token'];
  
          console.log('The access token has been refreshed!');
          console.log('access_token:', access_token);
          spotifyApi.setAccessToken(access_token);
        }, expires_in / 2 * 1000);
      })
      .catch(error => {
        console.error('Error getting Tokens:', error);
        res.send(`Error getting Tokens: ${error}`);
      });
    });


  app.get('/top_artists', (req, res) => {
    const token = "BQC-jOHLKB23ha6MC5TKqk_9zFMaypyswYpDEzYTGuLGr1CvYE-V5-A8ncW_po-Lud7CpazGVNwlKbj3AnOw9E1bPYiR4ykA6Wl73jPsSl1v4N_9O-UGbbUaxpODeA7OlgOH-AIPDUjOvv4XUTOIL9DmgGIM1dEcH7PCpmX0l5JxgNennY_xFl4VVtUCubMhuQ1P55vCCrX-n9qjp2isoOd4vi-l0yd2FbIt5OiM4s7qZXn-LosonZcA3nYWqRlyndt0l-4QdFB-7FLWgHiLH6k7I7IF2W1yMoN1EsP6N6mJEPkSYlyXaqkyE9MebewnsYsdlReKg8_6Fo8NSErmr429";
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
    const token = "BQC-jOHLKB23ha6MC5TKqk_9zFMaypyswYpDEzYTGuLGr1CvYE-V5-A8ncW_po-Lud7CpazGVNwlKbj3AnOw9E1bPYiR4ykA6Wl73jPsSl1v4N_9O-UGbbUaxpODeA7OlgOH-AIPDUjOvv4XUTOIL9DmgGIM1dEcH7PCpmX0l5JxgNennY_xFl4VVtUCubMhuQ1P55vCCrX-n9qjp2isoOd4vi-l0yd2FbIt5OiM4s7qZXn-LosonZcA3nYWqRlyndt0l-4QdFB-7FLWgHiLH6k7I7IF2W1yMoN1EsP6N6mJEPkSYlyXaqkyE9MebewnsYsdlReKg8_6Fo8NSErmr429";
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
  app.listen(9000, () =>
    console.log(
      'HTTP Server up. Now go to http://localhost:9000/login in your browser.'
    )
  );
  module.exports = app