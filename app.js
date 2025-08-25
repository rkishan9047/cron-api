import express from 'express';
import dotenv from 'dotenv';
import addonRoutes from './routes/addonRoutes.js'; // ✅ Import routes


dotenv.config();

const app = express();
app.use(express.json());


app.use('/api', addonRoutes); 

app.get('/', (req, res) => {
  res.send('API Running');
});

export default app;
