"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
var axios_1 = require("axios");
var moment = require("moment");
function fetchWeatherData() {
    return __awaiter(this, void 0, void 0, function () {
        var apiKey, cityName, date, apiUrl, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiKey = process.env.WEATHERAPIKEY;
                    cityName = 'São Paulo';
                    date = '2024-01-01';
                    apiUrl = "http://api.weatherapi.com/v1/history.json?key=".concat(apiKey, "&q=").concat(encodeURIComponent(cityName), "&dt=").concat(date);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].get(apiUrl)];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
                case 3:
                    error_1 = _a.sent();
                    console.error('Erro ao obter os dados da API:', error_1);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function extractData(response) {
    var location = response.location, forecast = response.forecast;
    var extractedData = {
        location: {
            name: location.name,
            region: location.region,
            country: location.country
        },
        forecast: {
            forecastday: forecast.forecastday.map(function (day) { return ({
                date: day.date,
                day: {
                    condition: day.day.condition
                },
                hour: day.hour.map(function (hour) { return ({
                    time_epoch: hour.time_epoch,
                    time: moment(hour.time, 'YYYY-MM-DD HH:mm').toISOString(),
                    temp_c: hour.temp_c,
                    humidity: hour.humidity,
                    cloud: hour.cloud
                }); })
            }); })
        }
    };
    return extractedData;
}
function writeDataToFile(data) {
    return __awaiter(this, void 0, void 0, function () {
        var filePath, jsonData, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filePath = 'weather_data.json';
                    jsonData = JSON.stringify(data, null, 4);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fs.promises.writeFile(filePath, jsonData)];
                case 2:
                    _a.sent();
                    console.log('Os dados foram escritos no arquivo com sucesso.');
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Erro ao escrever os dados no arquivo:', error_2);
                    throw error_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var weatherData, extractedData, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetchWeatherData()];
                case 1:
                    weatherData = _a.sent();
                    extractedData = extractData(weatherData);
                    return [4 /*yield*/, writeDataToFile(extractedData)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error('Erro durante a execução:', error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
main();
