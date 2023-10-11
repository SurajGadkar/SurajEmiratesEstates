import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

const app = express();
dotenv.config();
const PORT = 3000;
const MongoURI = process.env.MONGO_URI;

//encoding setups
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import Routers
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
mongoose
  .connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
app.use("/api/v1/auth", authRouter);

// Middlewares

//Error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Error Message";

  return res.status(statusCode).json({
    status: false,
    statusCode,
    message,
  });
});
