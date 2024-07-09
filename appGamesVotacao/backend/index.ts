
import express from 'express';
import cors from 'cors';
import jogosRoutes from './routes/jogos';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());
app.use('/jogos', jogosRoutes);

app.get('/', (req, res) => {
  res.send('API: Controle de Jogos');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
