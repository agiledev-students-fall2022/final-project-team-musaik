const router = require('express').Router();
const SpotifyWebApi = require('spotify-web-api-node');

router.get('/pin-playlists', async (req, res) => { 
    const user = req.session.user;
    const spotifyApi = new SpotifyWebApi ({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.ROOT_URL + '/callback'
    })
    spotifyApi.setAccessToken(user.access_token);
    spotifyApi.setRefreshToken(user.refresh_token);

    const me = await spotifyApi.getMe();    
    const playlist = await spotifyApi.getUserPlaylists(me.body.id);
        let playlists = playlist.body.items;
        const playlist_array =  [];
        
        for (let i = 0; i < 3;i++){
            console.log(playlists[i]);
            playlist_info = {
                'image': playlists[i].images[0]["url"],
                'id': playlists[i].id,
            }
            playlist_array.push(playlist_info)
        }
    res.json({
        playlists:playlist_array
    })
});
    
module.exports = router;