# Weather Backend API

A backend API for weather information, built with [NestJS](https://nestjs.com/) and powered by the OpenWeather API. This project provides endpoints to fetch weather data for various locations.

## Demo

You can try the live demo here: [https://syncorix-weather-backend.onrender.com](https://syncorix-weather-backend.onrender.com)

> **Note:** This app is hosted on [Render](https://render.com/) free service. After a period of inactivity, the server spins down. When you access the demo after such inactivity, you may see a loading screen for up to a minute while the server starts up again.

## Features
- Fetch current weather data for cities and countries
- Built with NestJS and TypeScript
- Uses OpenWeather API for accurate weather information

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v20.x
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd weather-be
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
   If you encounter dependency issues, run:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Create a `.env` file in the root directory and add your OpenWeather API key:
   ```env
   OPEN_WEATHER_API_KEY=your_api_key_here
   ```
   You can obtain a free API key from [weatherapi.com](https://www.weatherapi.com/).

### Running the App

- **Development:**
  ```bash
  npm run start:dev
  ```
- **Production:**
  ```bash
  npm run start:prod
  ```

### Testing
- **Unit tests:**
  ```bash
  npm run test
  ```
- **E2E tests:**
  ```bash
  npm run test:e2e
  ```
- **Test coverage:**
  ```bash
  npm run test:cov
  ```

## API Documentation

API documentation (Swagger UI) is available at `/api` when running the app locally or on the demo URL.
