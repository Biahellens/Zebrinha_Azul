import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { trafficRouter } from './routes/traffics.routes';
import { climateRouter } from './routes/climate.routes';

(async () => {
  await createConnection();

  const app = express();
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  );

  app.use(express.json());

  // Rotas para o TrafficController
  app.use("/traffics", trafficRouter);

  // Rotas para o ClimateController
  app.use("/climate", climateRouter);

  app.get('/', (req, res) => {
    return res.json('Established connection!');
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
})();
