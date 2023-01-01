//routes for api

const router = require('express').Router();
const SpotifyWebApi = require('spotify-web-api-node');
const { Session } = require('../models/Session');
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.ROOT_URL + '/callback'
});

router.post('/create-session', async (req, res) => { 
    const accessToken = req.session.user.access_token;
    spotifyApi.setAccessToken(accessToken);

    //get current user's id
    const host = await spotifyApi.getMe();
    const host_id = host.body.id;

    //get tracks from the selected playlist
    const playlist_tracks = await spotifyApi.getPlaylistTracks(req.body.playlistId);
    const playlist_length = playlist_tracks.body.items.length;
    const session_tracks = [];
    for (let i = 0; i < playlist_length; i++) {
        session_tracks.push(playlist_tracks.body.items[i].track.id);
    }

    try {
        //save the created session to database
        const session = await Session.create({
            host: host_id,
            playlist: session_tracks,
            listeners: [],
            listener_count: 0,
        })
        //send the created session to client
        return res.json({
            session: session,
            status: 'success',
        })
    } catch (err) {
        console.error(err)
        return res.status(400).json({
            error: err,
            status: 'Failed to save a session to the database',
        })
    }
});

router.get('/top-sessions', async (req, res) => {
    const accessToken = req.session.user.access_token;
    spotifyApi.setAccessToken(accessToken);
    try {
        // retrieve top sessions from database
        const sessions = await Session.find().sort({'createdAt':-1}).limit(6); // retrieve latest sessions for now
        // send the top sessions to client
        return res.json({
            sessions: sessions,
            status: 'success',
        })
    } catch (err) {
        console.error(err)
        return res.status(400).json({
            error: err,
            status: 'Failed to save a session to the database',
        })
    }
});

router.post('/join-session', (req, res) => {
    const session = req.session.session; // get clicked session
    // session.joined_users.append(req.session.user); // send request to database to add current user to the joined user list
    res.json({
        session: session
    });
});

router.post('/change-song', async (req, res) => {
    const session = req.session.session;
    const users = session.joined_users;
    const host = session.host;

    spotifyApi.setAccessToken(host.access_token);
    spotifyApi.setRefreshToken(host.refresh_token);

    const playback = await spotifyApi.getMyCurrentPlaybackState();
    const currentSong = playback.body.item.uri;

    session.currentSong = currentSong;

    users.forEach(async (user) => {
        spotifyApi.setAccessToken(user.access_token);
        spotifyApi.setRefreshToken(user.refresh_token);
        await spotifyApi.addToQueue(session.currentSong);
    });

    res.json({
        session: session
    });

});

router.get('/playlist-search', async (req, res) => {
    const user = req.session.user;

    spotifyApi.setAccessToken(user.access_token);
    spotifyApi.setRefreshToken(user.refresh_token);

    const userInfo = await spotifyApi.getMe();
    const playlistsRes = await spotifyApi.getUserPlaylists(userInfo.body.id);
    const playlists = playlistsRes.body.items;

    const playlistsArray = [];

    playlists.forEach((playlist) => {
        playlistsArray.push({
            name: playlist.name,
            id: playlist.id,
            img: playlist.images[0].url
        });
    });
    // console.log(playlistsArray)
    res.json(playlistsArray);

});

module.exports = router;