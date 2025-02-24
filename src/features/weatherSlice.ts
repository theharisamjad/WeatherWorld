import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endPoints } from "../constants/endPoints";
import Constants from "expo-constants"; // Import expo-constants

// Define the shape of the weather data
export interface Condition {
  code: number;
  icon: string;
  text: string;
}

export interface CurrentWeather {
  cloud: number;
  condition: Condition;
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  humidity: number;
  is_day: number;
  last_updated: string;
  last_updated_epoch: number;
  precip_mm: number;
  pressure_mb: number;
  wind_kph: number;
  wind_dir: string;
  gust_kph: number;
  uv: number;
  vis_km: number;
}

export interface ForecastDay {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalsnow_cm: number;
    avgvis_km: number;
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    condition: Condition;
    uv: number;
  };
  hour: {
    time: string;
    temp_c: number;
    temp_f: number;
    condition: Condition;
    wind_kph: number;
    wind_dir: string;
    pressure_mb: number;
    precip_mm: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    will_it_rain: number;
    chance_of_rain: number;
    will_it_snow: number;
    chance_of_snow: number;
    vis_km: number;
    gust_kph: number;
    uv: number;
  }[];
}

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime: string;
  localtime_epoch: number;
}

export interface WeatherData {
  location: Location;
  current: CurrentWeather;
  forecast: {
    forecastday: ForecastDay[];
  };
}

interface WeatherState {
  data: WeatherData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  status: "idle",
  error: null,
};

const baseUrl = "https://api.weatherapi.com";
const apiKey = Constants.expoConfig?.extra?.weatherApiKey;

// Async thunk to fetch weather data
export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (city: string) => {
    if (!apiKey) {
      console.error(
        "API key is missing, please configure your key on weatherapi.com and add in env file!"
      );
      return;
    }

    const response = await axios.get(
      `${baseUrl}${endPoints.forecastEndpoint}`,
      {
        params: {
          key: apiKey,
          q: city, // Replace with the desired location
          days: 3, // Fetch forecast for 3 days
        },
      }
    );
    return response.data as WeatherData;
  }
);

// Create a slice
const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearWeatherData: (state) => {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.status = "failed";
        console.log(action.error.message);
        state.error = action.error.message || "Failed to fetch weather data";
      });
  },
});

// Export the clearWeatherData action
export const { clearWeatherData } = weatherSlice.actions;

export default weatherSlice.reducer;
