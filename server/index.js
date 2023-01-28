import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";

import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();
//This allows us to pull out our environment variables from dotenv file

const app = express();
//We initialize our express application

app.use(cors());
app.use(express.json({ limit: "50mb" }));
//We add additional middlewares to it

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);
//We also have to create middlewares for routes
//We created API endpoints that we can connect (hook) to from our frontend side

app.get("/", async (req, res) => {
  res.send("Hello from DALL-E!");
});
//We create first route

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("Server has started on port http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
//This is a way to run app

/*
We've created a simple instance of our backend API that has one route where we can verify
that our app is working
Then we have also started our server and we have connected it to mongoDB
by passing the specific mongoDB url, query for our mongoDB atlas cluster
Then we have added postRoutes and dalleRoutes
And then we generate images from openai dalle API
*/
