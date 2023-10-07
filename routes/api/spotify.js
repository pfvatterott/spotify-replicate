const router = require("express").Router();
const dotenv = require('dotenv').config();
const axios = require('axios')
const qs = require('qs')

const getBearerToken = async (req, res) => {
    try {
        const data = {
            code: req.body.code,
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
        res.json(bearerToken.data)
    } catch (err) {
        console.log(err)
    }
}

// Matches with "/api/books"
router.route("/login")
    .post(getBearerToken)


module.exports = router;
