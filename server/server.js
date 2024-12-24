import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongoose.config.js';
import songRoute from './routes/song.routes.js';
import userRoute from "./routes/user-routes.js";

//pulling env vars
dotenv.config();

//making instance of our express service
const app = express();

//attach middleware to our express service
app.use(express.json(), cors());

/* direct user api routes to user router */
app.use('/api/songs', songRoute);
app.use("/api/users", userRoute);

async function serverStart() {
  try {
    dbConnect();
    const PORT = process.env.PORT;
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}

serverStart();
