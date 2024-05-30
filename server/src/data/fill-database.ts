import 'dotenv/config'
import { createConnection, getRepository } from 'typeorm';
import * as fs from 'fs';
import { Climate } from '../entities/Climate';
import { Traffic } from '../entities/Traffic';

const port = process.env.DATABASE_PORT
  ? parseInt(process.env.DATABASE_PORT, 10)
  : 5432

async function fillDatabase() {
  try {
    await createConnection({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: port,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      entities: [Traffic, Climate],
      migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
    });

    // Preencher dados de Clima
    const climateData = JSON.parse(fs.readFileSync('weather_data.json', 'utf-8'));
    const climateRepository = getRepository(Climate);
    const climate = new Climate();
    climate.locationName = climateData.location.name;
    climate.region = climateData.location.region;
    climate.country = climateData.location.country;
    climate.forecast = climateData.forecast.forecastday[0];
    await climateRepository.save(climate);

    // Preencher dados de Tráfego
    const trafficData = JSON.parse(fs.readFileSync('tomtom_data.json', 'utf-8'));
    const trafficRepository = getRepository(Traffic);
    const traffic = new Traffic();
    traffic.routes = trafficData.routes;
    await trafficRepository.save(traffic);

    console.log('Dados inseridos no banco de dados com sucesso!');
  } catch (error) {
    console.error('Erro ao preencher o banco de dados:', error);
  }
}

fillDatabase();
