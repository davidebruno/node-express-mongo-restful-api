import express from 'express';
import dotenv from 'dotenv';

import { connectToDatabase } from './databaseConnection';
import { roleRoute } from './routes/role.route';
import { userRoute } from './routes/user.route';

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

const WELCOME_RESPONSE = `<div style="color:white;background-color:Blue;text-align:center">
                          <h2>Welcome from REST API !!</h2><marquee direction="right" behavior="alternate">
                          <h2 style="color:#FFD700"> RESTFul API that provides CRUD Operations on MongoDB</h2></marquee></div>`

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', roleRoute());
app.use('/', userRoute());

app.get('/', (req, res) => {
  return res.send(WELCOME_RESPONSE);
});


app.listen(PORT, async () => {
  await connectToDatabase();

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
