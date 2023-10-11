const router = require("express").Router();
const dotenv = require('dotenv').config();
const Replicate = require('replicate')


const queryModel = async (req, res) => {
    try {
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        let favoriteGenres = req.body.favoriteGenres

        // let favoriteArtists = req.body.favoriteArtists
        // let newFavArtistsArray = []
        // for (let i = 0; i < favoriteArtists.length; i++) {
        //     newFavArtistsArray.push(favoriteArtists[i].name)
        // }
        const sysPrompt = `You will receive a prompt requesting you to make a playlist for the user. Provided with the prompt is an array of their favorite artists. Respond in an array of JSON objects. Each object should have two key value pairs. One is called "artist" and the other is "title". The artist should be the artist of the song and the title should be the name of the song. Here are some rules: 1. Do not include the user's favorite genres if the genre does not match the prompt 2. Unless otherwise specified, include 20 songs. 3. The maximum amount of songs you can provide is 30. 5. Prioritize finding the best songs to match the prompt over the type of music that the user enjoys.`

        const model = "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3";
        const options = {
            input: {
                prompt: `User prompt: ${req.body.prompt}. User's Favorite Genres: ${favoriteGenres}`, system_prompt: sysPrompt,
                max_new_tokens: 1500
            }
        }
        let output = await replicate.run(model, options);
        res.json(output)
    } catch (err) {
        console.log(err)
    }
}



router.route("/query")
    .post(queryModel)




module.exports = router;
