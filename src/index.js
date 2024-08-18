import express from 'express';
import bodyParser from 'body-parser';
import db from '../config/database.js';
import detailRoute from '../routes/index.js'
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config()
const app = express();
app.use(express.static('public'));
app.use(cors())
app.use(bodyParser.json());

try {
  await db.authenticate();
} catch (error) {
}


app.use('/', detailRoute);

app.listen(process.env.PORT, () =>{
  console.log(`Server started at ${process.env.PORT}!!!`);
},);