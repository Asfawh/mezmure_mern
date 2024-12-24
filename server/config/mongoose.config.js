import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.oowm8ce.mongodb.net/${DB_NAME}`;
// const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.oowm8ce.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const dbConnect = async () => {
  try {
    await connect(MONGODB_URI, { retryWrites: true });
    // connect(MONGODB_URI, { dbName: 'Song' });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(`DB Connection Failed: Error --> ${error}`);
  }
};

export default dbConnect;
