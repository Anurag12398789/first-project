import mongoose from "mongoose";
import envConfig from"./envConfig.js";

const connectDb = async () => {
    await mongoose.connect(envConfig.MOGODB_URL, {

    }).then(() => {
        console.log("mongodb is connected successfully ")
    }).catch(() => {
        console.log("mongodb connection failed")
    })
}
export default connectDb;