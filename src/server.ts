import mongoose from "mongoose";
import app from './app';
import config from "./app/config";
// import config from './config';




async function main() {
    try {
        await mongoose.connect(config.local_database_url as string);
        app.listen(config.port, () => {
            console.log(`Mongoose Express app listening on port ${config.port}`)
        })
    } catch (error) {
        console.log(error);
    }
}


main().catch(err => console.log(err));