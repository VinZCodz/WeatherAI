import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

/**
 * A function that returns the temperature of a specific location
 * in either C: Celsius or F: Fahrenheit as a formatted string.
 *
 * @param location The name of the city (e.g., "New York", "London").
 * @param unit The desired temperature unit ('C' for Celsius, 'F' for Fahrenheit).
 * @returns The temperature as a formatted string (e.g., "25°C"), or null if the location is not supported.
 */
function getTemperature(location: string, unit: 'C' | 'F'): string | null {
  let temperatureInCelsius: number | null = null;

  switch (location.toLowerCase()) {
    case 'new york':
      temperatureInCelsius = 25;
      break;
    case 'london':
      temperatureInCelsius = 18;
      break;
    case 'bangalore':
      temperatureInCelsius = 28;
      break;
    case 'sydney':
      temperatureInCelsius = 30;
      break;
    case 'paris':
      temperatureInCelsius = 22;
      break;
    default:
      return null;
  }

  if (unit === 'F') {
    const temperatureInFahrenheit = (temperatureInCelsius! * 9 / 5) + 32;
    return `${temperatureInFahrenheit.toFixed(1)}°F`;
  } else {
    return `${temperatureInCelsius}°C`;
  }
};

const response = await openai.chat.completions.create({
  model: "gemini-2.0-flash",
  messages: [
    { role: "system", content: "You are a helpful assistant who understands human natural langagues." },
    {
      role: "user",
      content: "Whats the present/real time temprature at Bangalore in celsius?",
    }
  ],
  tools: [
    {
      "type": "function",
      "function": {
        "name": "getTemperature",
        "description": "Get the Temperature in a given location",
        "parameters": {
          "type": "object",
          "properties": {
            "location": {
              "type": "string",
              "description": "The city and state, e.g. Chicago, IL",
            },
            "unit": { "type": "string", "enum": ["C", "F"] },
          },
          "required": ["location"],
        },
      }
    }
  ]
});

console.log("Response: ", response);