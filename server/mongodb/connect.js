import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose.set("strictQuery", true);
  //This is usefull when working with search functionality
  mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
  //Now we connect the database
};

export default connectDB;
