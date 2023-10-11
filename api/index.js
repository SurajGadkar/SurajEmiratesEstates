import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const PORT = 3000;
const MongoURI = process.env.MONGO_URI;

// Import Routers
import userRouter from "./routes/user.route.js";

mongoose
  .connect(MongoURI)
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server listening on port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error : ", err);
  });

//Routes

app.use("/api/v1/user", userRouter);
