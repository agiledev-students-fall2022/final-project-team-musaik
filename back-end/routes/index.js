//routes for index

const router = require('express').Router();
const SpotifyWebApi = require('spotify-web-api-node');

router.get('/api/profile', (req,res) =>{
    const user = req.session.user;

    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.ROOT_URL + '/callback'
    });

    //get top artists

    spotifyApi.setAccessToken(user.access_token);
    spotifyApi.setRefreshToken(user.refresh_token);
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
        let myTopFive = []

        for(let i = 0; i< 4; i++){
          myTopFive.push(topArtists[i])
        }

        res.json(myTopFive)
 
      }
      getMyData();
})

module.exports = router