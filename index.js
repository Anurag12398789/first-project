import express from "express";
import connectDb from "./config/db.js";
import envConfig from "./config/envConfig.js";
import route from "./route/authRouter.js";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
app.use(bodyParser.json());
app.use(cors());
connectDb();
app.use("/api/v1", route);
app.listen(envConfig.PORT, (error) => {
  console.log("server is running on port number : 4000");
  if (error) {
    console.log("error in connecting server");
  }
});
