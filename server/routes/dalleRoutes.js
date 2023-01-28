import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
//To make sure that our environment variables are indeed getting populated

const router = express.Router();
//We create new instance of a router

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
//We call this configuration as a function and pass in an object as the only parameter

const openai = new OpenAIApi(configuration);

//We create an instance of openai and we pass the configuration where we entered our API key

router.route("/").get((req, res) => {
  res.send("Hello from DALL-E!");
});
//To test our router properly

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    //This comes from our front-end side, the prompt that we created
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    //Now we generate our image

    const image = aiResponse.data.data[0].b64_json;
    //Now that we have this aiResponse, we need to get the image out of it

    res.status(200).json({ photo: image });
    //We are getting that image and we are sending it back to the front-end
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response.data.error.message);
    //This applies if we get error
  }
});

export default router;
