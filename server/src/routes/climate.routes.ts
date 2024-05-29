import express from 'express';
import { ClimateController } from '../controllers/climate.controller';

const Router = express.Router();

// Rotas para clima
Router.get('/allClimate', ClimateController.getAll);

export { Router as climateRouter }