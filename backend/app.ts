import express from 'express';
import cors from 'cors';
import router from './routes/item.route.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke');
});

app.listen(8080, () => {
  console.log('Server is running at http://localhost:8080');
});