import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Home from "../index";
import weatherReducer, { WeatherState } from "../../../features/weatherSlice";

// Mock the theme context
jest.mock("../../../ThemeContext", () => ({
  useTheme: () => ({
    paperTheme: {
      colors: {
        background: "#ffffff",
        primary: "#000000",
      },
    },
  }),
}));

// Create a mock store
const createMockStore = (initialState: Partial<WeatherState> = {}) => {
  return configureStore({
    reducer: {
      weather: weatherReducer,
    },
    preloadedState: {
      weather: {
        data: null,
        status: "idle" as const,
        error: null,
        ...initialState,
      },
    },
  });
};

describe("Home Component", () => {
  it("renders welcome message when status is idle", () => {
    const store = createMockStore();
    const { getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(
      getByText("Welcome to Weather World, search up to get started!")
    ).toBeTruthy();
  });

  it("renders loading indicator when status is loading", () => {
    const store = createMockStore({ status: "loading" });
    const { getByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(getByTestId("activity-indicator")).toBeTruthy();
  });

  it("renders error message when status is failed", () => {
    const store = createMockStore({ status: "failed" });
    const { getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(
      getByText("Something went wrong, try searching for another city!")
    ).toBeTruthy();
  });

  it("renders weather data when status is succeeded", () => {
    const mockWeatherData = {
      location: {
        name: "Test City",
        region: "Test Region",
        country: "Test Country",
        lat: 0,
        lon: 0,
        tz_id: "UTC",
        localtime: "2024-02-24 12:00",
        localtime_epoch: 1708694400,
      },
      current: {
        cloud: 0,
        condition: {
          text: "Sunny",
          icon: "test-icon.png",
          code: 1000,
        },
        temp_c: 25,
        temp_f: 77,
        feelslike_c: 25,
        feelslike_f: 77,
        humidity: 50,
        is_day: 1,
        last_updated: "2024-02-24 12:00",
        last_updated_epoch: 1708694400,
        precip_mm: 0,
        pressure_mb: 1013,
        wind_kph: 10,
        wind_dir: "N",
        gust_kph: 15,
        uv: 5,
        vis_km: 10,
      },
      forecast: {
        forecastday: [
          {
            date: "2024-02-24",
            date_epoch: 1708694400,
            day: {
              maxtemp_c: 30,
              maxtemp_f: 86,
              mintemp_c: 20,
              mintemp_f: 68,
              avgtemp_c: 25,
              avgtemp_f: 77,
              maxwind_kph: 15,
              totalprecip_mm: 0,
              totalsnow_cm: 0,
              avgvis_km: 10,
              avghumidity: 50,
              daily_will_it_rain: 0,
              daily_chance_of_rain: 20,
              daily_will_it_snow: 0,
              daily_chance_of_snow: 0,
              condition: {
                text: "Sunny",
                icon: "test-icon.png",
                code: 1000,
              },
              uv: 5,
            },
            hour: [],
          },
          {
            date: "2024-02-25",
            date_epoch: 1708780800,
            day: {
              maxtemp_c: 30,
              maxtemp_f: 86,
              mintemp_c: 20,
              mintemp_f: 68,
              avgtemp_c: 25,
              avgtemp_f: 77,
              maxwind_kph: 15,
              totalprecip_mm: 0,
              totalsnow_cm: 0,
              avgvis_km: 10,
              avghumidity: 50,
              daily_will_it_rain: 0,
              daily_chance_of_rain: 20,
              daily_will_it_snow: 0,
              daily_chance_of_snow: 0,
              condition: {
                text: "Sunny",
                icon: "test-icon.png",
                code: 1000,
              },
              uv: 5,
            },
            hour: [],
          },
          {
            date: "2024-02-26",
            date_epoch: 1708867200,
            day: {
              maxtemp_c: 30,
              maxtemp_f: 86,
              mintemp_c: 20,
              mintemp_f: 68,
              avgtemp_c: 25,
              avgtemp_f: 77,
              maxwind_kph: 15,
              totalprecip_mm: 0,
              totalsnow_cm: 0,
              avgvis_km: 10,
              avghumidity: 50,
              daily_will_it_rain: 0,
              daily_chance_of_rain: 20,
              daily_will_it_snow: 0,
              daily_chance_of_snow: 0,
              condition: {
                text: "Sunny",
                icon: "test-icon.png",
                code: 1000,
              },
              uv: 5,
            },
            hour: [],
          },
        ],
      },
    };

    const store = createMockStore({
      status: "succeeded",
      data: mockWeatherData,
    });

    const { getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(getByText("Test City")).toBeTruthy();
    expect(getByText("25°C")).toBeTruthy();
    expect(getByText("Sunny")).toBeTruthy();
  });
});
