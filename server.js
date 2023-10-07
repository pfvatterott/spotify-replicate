const express = require("express");
const cors = require("cors");
const app = express();
const Replicate = require("replicate")
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});


const runReplicate = async () => {
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
      });
      
      const model = "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf";
      const input = { prompt: "an astronaut riding a horse on mars, hd, dramatic lighting, detailed" };
      const output = await replicate.run(model, { input });
      
      console.log(output);
}

runReplicate()
