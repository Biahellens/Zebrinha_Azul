import { createConnection, getConnection } from 'typeorm';
import * as fs from 'fs';
import { Climate } from '../entities/Climate';
import { Traffic } from '../entities/Traffic';

async function fillDatabase() {
  try {
    await createConnection();

    const climateData = JSON.parse(fs.readFileSync('weather_data.json', 'utf-8'));
    const climateRepository = getConnection().getRepository(Climate);
    await climateRepository.save(climateData);

    const trafficData = JSON.parse(fs.readFileSync('tomtom_data.json', 'utf-8'));
    const trafficRepository = getConnection().getRepository(Traffic);
    await trafficRepository.save(trafficData);

    console.log('Dados inseridos no banco de dados com sucesso!');
  } catch (error) {
    console.error('Erro ao preencher o banco de dados:', error);
  }
}

fillDatabase();
