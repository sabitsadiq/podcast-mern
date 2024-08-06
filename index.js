import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import routes from "./routes/index.js";

const app = express();
dotenv.config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Db connection established");
  } catch (error) {
    console.log("DB error:" + error);
  }
};

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      //   "https://taskite.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", routes);
const Port = process.env.PORT || 5000;

app.listen(Port, () => {
  dbConnection();
  console.log(`Server is running on port ${Port}`);
});
