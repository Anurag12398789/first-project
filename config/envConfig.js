import * as dotenv from "dotenv";
dotenv.config();

const envConfig = {
    MOGODB_URL : process.env.dbUrl,
    PORT : process.env.port
}
export default envConfig;