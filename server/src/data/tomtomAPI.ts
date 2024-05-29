/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import * as fs from 'fs'

async function fetchTomTomData() {
  const APIKEY = process.env.TOMTOMAPIKEY
  const saoPauloCoords = '-23.5505,-46.6333'
  const rioDeJaneiroCoords = '-22.9068,-43.1729'

  const apiUrl = `https://api.tomtom.com/routing/1/calculateRoute/${saoPauloCoords}:${rioDeJaneiroCoords}/json?key=${APIKEY}`

  try {
    const response = await axios.get(apiUrl)
    const data = response.data

    const routesData = data.routes.map(
      (route: {
        summary: {
          departureTime: string | number | Date
          arrivalTime: string | number | Date
        }
        legs: any[]
      }) => {
        return {
          summary: {
            ...route.summary,
            departureTime: new Date(route.summary.departureTime),
            arrivalTime: new Date(route.summary.arrivalTime),
          },
          legs: route.legs.map(
            (leg: {
              summary: {
                departureTime: string | number | Date
                arrivalTime: string | number | Date
              }
            }) => ({
              ...leg,
              summary: {
                ...leg.summary,
                departureTime: new Date(leg.summary.departureTime),
                arrivalTime: new Date(leg.summary.arrivalTime),
              },
            })
          ),
        }
      }
    )

    fs.writeFileSync('tomtom_data.json', JSON.stringify(routesData))

    return routesData
  } catch (error) {
    console.error('Erro ao obter os dados da API:', error)
    throw error
  }
}

fetchTomTomData()
  .then((data) => {
    console.log('Dados das rotas:', data)
  })
  .catch((error) => {
    console.error('Erro ao obter os dados das rotas:', error)
  })
