import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../mongodb/models/post.js";

dotenv.config();
//To make sure that our environment variables are indeed getting populated

const router = express.Router();
//We create new instance of a router

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fetching posts failed, please try again",
    });
  }
});
//With this, now we can see the posts
//GET ALL POSTS

router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    //We get all of the data that we are sending from the front-end

    const photoUrl = await cloudinary.uploader.upload(photo);
    //And we need to upload a photo url to cloudinary

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });
    //Creating a new instance of a document

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create a post, please try again",
    });
  }
});
//CREATING A POST
//First we are uploading the image to cloudinary, that stores it, and gives us back the photo url
//Based on that info, we then create a newPost in the database by sharing the url

//We create two post routes

export default router;
