const router = require("express").Router();
const dotenv = require('dotenv').config();
const Replicate = require('replicate')


const queryModel = async (req, res) => {
    try {
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        const model = "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3";
        const input = { prompt: "tell me a joke" };
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
