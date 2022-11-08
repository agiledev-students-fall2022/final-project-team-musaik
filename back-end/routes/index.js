const router = require('express').Router();
const SpotifyWebApi = require('spotify-web-api-node');



router.get('/', (req,res) =>{
    const host = req.session.user;

    const spotifyApi = new SpotifyWebApi({
        clientId: "XXX",
        clientSecret: "XXX",
        redirectUri: process.env.SPOTIFY_REDIRECT_URI
    });

    spotifyApi.setAccessToken(host.access_token);
    spotifyApi.setRefreshToken(host.refresh_token);
    function getMyData() {
        (async () => {
          const me = await spotifyApi.getMe();
          getMyTopArtists()
        })().catch(e => {
          console.error(e);
        });
      }
      
      
      async function getMyTopArtists(userName){
        const data = await spotifyApi.getMyTopArtists()
        let topArtists = data.body.items;
        let myTopArtists = []
        for(let i=0; i<5;i++){
          myTopArtists.push(topArtists[i].name)
          console.log(topArtists[i])
      
        }

        res.json(myTopArtists)
      
      
      }
        console.log(';')
      getMyData();
})

module.exports = router