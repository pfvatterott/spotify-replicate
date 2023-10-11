const router = require("express").Router();
const dotenv = require('dotenv').config();
const axios = require('axios')
const qs = require('qs')

const getBearerToken = async (code) => {
    try {
        const data = {
            code: code,
            redirect_uri: 'http://localhost:3000/callback',
            grant_type: 'authorization_code'
        };
        const bearerToken = await axios.post('https://accounts.spotify.com/api/token', data,
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
                }
            }
        )

        return bearerToken.data
    } catch (err) {
        console.log(err)
    }
}

const getRefreshToken = async (refreshToken) => {
    try {
        const data = {
            refresh_token: refreshToken,
            grant_type: 'refresh_token'
        };
        const bearerToken = await axios.post('https://accounts.spotify.com/api/token', data,
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
                }
            }
        )
        return bearerToken.data
    } catch (err) {
        console.log(err)
    }
}


const getProfileData = async (req, res) => {
    let userAuth;
    if (req.body.code) {
        userAuth = await getBearerToken(req.body.code)
    }
    else {
        userAuth = await getRefreshToken(req.body.refreshToken)
    }
    try {
        const userData = await axios.get('https://api.spotify.com/v1/me',
            {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${userAuth.access_token}`
                }
            }
        )
        let userDataRes = userData.data
        userDataRes.refreshToken = userAuth.refresh_token
        res.json(userDataRes)
    } catch (err) {
        console.log(err)
    }
}

const getTopArtists = async (req, res) => {
    let userAuth;
    if (req.body.code) {
        userAuth = await getBearerToken(req.body.code)
    }
    else {
        userAuth = await getRefreshToken(req.body.refreshToken)
    }
    try {
        const userData = await axios.get('https://api.spotify.com/v1/me/top/artists',
            {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${userAuth.access_token}`
                }
            }
        )
        let userDataRes = userData.data
        userDataRes.refreshToken = userAuth.refresh_token
        res.json(userDataRes)
    } catch (err) {
        console.log(err)
    }
}

const getTopGenres = async (req, res) => {
    let userAuth;
    if (req.body.code) {
        userAuth = await getBearerToken(req.body.code)
    }
    else {
        userAuth = await getRefreshToken(req.body.refreshToken)
    }
    try {
        const userData = await axios.get('https://api.spotify.com/v1/me/top/artists',
            {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${userAuth.access_token}`
                }
            }
        )
        let userDataRes = userData.data
        let genres = []
        let artists = userData.data.items 
        for (let i = 0; i < artists.length; i++) {
            artists[i].genres.forEach(genre => {
                if (!genres.includes(genre)) {
                    genres.push(genre)
                }
            });
            
        }
        let returnObj = {
            genres: genres,
            refreshToken: userAuth.refresh_token
        }
        res.json(returnObj)
    } catch (err) {
        console.log(err)
    }
}

const getSong = async (req, res) => {
    let userAuth;
    if (req.body.code) {
        userAuth = await getBearerToken(req.body.code)
    }
    else {
        userAuth = await getRefreshToken(req.body.refreshToken)
    }
    try {
        const songData = await axios.get(`https://api.spotify.com/v1/search?q=artist:${req.body.artist}%20track:${req.body.song}&type=track`,
            {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${userAuth.access_token}`
                }
            }
        )
        let songDataRes = songData.data
        songDataRes.refreshToken = userAuth.refresh_token
        res.json(songDataRes)
    } catch (err) {
        console.log(err)
    }
}

const createPlaylist = async (playlistName, userId, auth) => {
    try {
        const playlistData = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`,
            {
                "name": playlistName,
                "public": false
            },
            {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${auth}`
                }
            })
        return playlistData.data
    } catch (err) {
        console.log(err)
    }
}

const addSongsToPlaylist = async (playlistId, songUriArray, auth) => {
    try {
        const playlistData = await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            {
                "uris": songUriArray
            },
            {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${auth}`
                }
            })
        return playlistData.data
    } catch (err) {
        console.log(err)
    }
}

const savePlaylist = async (req, res) => {
    let userAuth;
    if (req.body.code) {
        userAuth = await getBearerToken(req.body.code)
    }
    else {
        userAuth = await getRefreshToken(req.body.refreshToken)
    }
    try {
        let playlistDetails = await createPlaylist(req.body.playlistName, req.body.userId, userAuth.access_token)
        let songArray = req.body.songs
        let songUriArray = []
        for (let i = 0; i < songArray.length; i++) {
            songUriArray.push(songArray[i].uri)
        }
        await addSongsToPlaylist(playlistDetails.id, songUriArray, userAuth.access_token)

        playlistDetails.refreshToken = userAuth.refresh_token
        res.json(playlistDetails)
    } catch (err) {
        console.log(err)
    }
}

router.route("/getProfileData")
    .post(getProfileData)

router.route("/getTopArtists")
    .post(getTopArtists)

    router.route("/getTopGenres")
    .post(getTopGenres)

router.route("/getSong")
    .post(getSong)

router.route("/savePlaylist")
    .post(savePlaylist)

module.exports = router;
