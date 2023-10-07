const router = require("express").Router();
const dotenv = require('dotenv').config();
const Replicate = require('replicate')


const queryModel = async (req, res) => {
    try {
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        let favoriteArtists = req.body.favoriteArtists
        let newFavArtistsArray = []
        for (let i = 0; i < favoriteArtists.length; i++) {
            newFavArtistsArray.push(favoriteArtists[i].name)
        }
        const sysPrompt = `You will receive a prompt requesting you to make a playlist for the user. Provided with the prompt is an array of their favorite artists. Respond only with an array of objects. Each object should have an artist key value pair as well as a title key value pair.`

        const model = "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3";
        const input = { prompt: `User prompt: ${req.body.prompt}. User's Favorite Artists: ${newFavArtistsArray}`, system_prompt: sysPrompt };
        const output = await replicate.run(model, { input });

        console.log(output.join(""));
        res.json(output)
    } catch (err) {
        console.log(err)
    }
}



router.route("/query")
    .post(queryModel)




module.exports = router;
