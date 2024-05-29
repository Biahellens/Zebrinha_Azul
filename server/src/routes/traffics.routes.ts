import express from 'express';
import { TrafficController } from '../controllers/traffic.controller';
const Router = express.Router();

// Rotas para traficos
Router.get('/allTraffics', TrafficController.getAll);

export { Router as trafficRouter }