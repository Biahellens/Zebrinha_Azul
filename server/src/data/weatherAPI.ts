import * as fs from 'fs';
import axios from 'axios';
import moment = require('moment');

interface WeatherAPIResponse {
    location: Location;
    forecast: {
        forecastday: ForecastDay[];
    };
}

interface Location {
    name: string;
    region: string;
    country: string;
}

interface ForecastDay {
    date: string;
    day: {
        condition: Condition;
    };
    hour: Hour[];
}

interface Condition {
    text: string;
    icon: string;
    code: number;
}

interface Hour {
    time_epoch: number;
    time: string;
    temp_c: number;
    humidity: number;
    cloud: number;
}

async function fetchWeatherData(): Promise<WeatherAPIResponse> {
    const apiKey = process.env.WEATHERAPIKEY;
    const cityName = 'São Paulo';
    const date = '2024-01-01';
    const apiUrl = `http://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${encodeURIComponent(cityName)}&dt=${date}`;

    try {
        const response = await axios.get(apiUrl);
        return response.data as WeatherAPIResponse;
    } catch (error) {
        console.error('Erro ao obter os dados da API:', error);
        throw error;
    }
}

function extractData(response: WeatherAPIResponse): unknown {
    const { location, forecast } = response;

    const extractedData = {
        location: {
            name: location.name,
            region: location.region,
            country: location.country,
        },
        forecast: {
            forecastday: forecast.forecastday.map((day: ForecastDay) => ({
                date: day.date,
                day: {
                    condition: day.day.condition
                },
                hour: day.hour.map((hour: Hour) => ({
                    time_epoch: hour.time_epoch,
                    time: moment(hour.time, 'YYYY-MM-DD HH:mm').toISOString(),
                    temp_c: hour.temp_c,
                    humidity: hour.humidity,
                    cloud: hour.cloud
                }))
            }))
        }
    };

    return extractedData;
}

async function writeDataToFile(data: unknown): Promise<void> {
    const filePath = 'weather_data.json';
    const jsonData = JSON.stringify(data, null, 4);

    try {
        await fs.promises.writeFile(filePath, jsonData);
        console.log('Os dados foram escritos no arquivo com sucesso.');
    } catch (error) {
        console.error('Erro ao escrever os dados no arquivo:', error);
        throw error;
    }
}

async function main() {
    try {
        const weatherData = await fetchWeatherData();
        const extractedData = extractData(weatherData);

        await writeDataToFile(extractedData);
    } catch (error) {
        console.error('Erro durante a execução:', error);
    }
}

main();
