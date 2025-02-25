import {
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../ThemeContext";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import {
  ActivityIndicator,
  Button,
  Card,
  Icon,
  Text,
} from "react-native-paper";
import { fonts } from "../../constants/fonts";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import dayjs from "dayjs";
import { width } from "../../constants/sizes";
import WeatherCard from "../../components/WeatherCard";

type WeatherStatItemType = {
  iconSource: string;
  statValue: string;
  statInfo: string;
};

const WeatherStatItem: React.FC<WeatherStatItemType> = ({
  iconSource,
  statValue,
  statInfo,
}) => (
  <View style={styles.weatherStateContainer}>
    <Icon size={24} source={iconSource} />
    <Text style={styles.weatherStateStyle}>{statValue}</Text>
    <Text style={styles.date}>{statInfo}</Text>
  </View>
);

const Home = () => {
  const { paperTheme } = useTheme();
  const { data, status } = useSelector((state: RootState) => state.weather);
  const [selectedTab, setSelectedTab] = useState<
    "today" | "tomorrow" | "forecast"
  >("today");

  const location = data?.location;
  const currentData = data?.current;
  const forecastData = data?.forecast.forecastday;
  const chanceOfRain =
    forecastData && forecastData.length > 0
      ? forecastData[0]?.day?.daily_chance_of_rain
      : "";

  if (status === "idle") {
    return (
      <View
        style={[
          styles.container,
          styles.extraContainerStyle,
          {
            backgroundColor: paperTheme.colors.background,
          },
        ]}
      >
        <Image
          source={require("../../assets/images/search.png")}
          style={styles.image}
        />
        <Text style={styles.stateMessages}>
          {"Welcome to Weather World, search up to get started!"}
        </Text>
      </View>
    );
  }

  if (status === "loading") {
    return (
      <View
        style={[
          styles.container,
          styles.extraContainerStyle,
          {
            backgroundColor: paperTheme.colors.background,
          },
        ]}
      >
        <ActivityIndicator
          animating={true}
          color={paperTheme.colors.primary}
          size={"large"}
        />
      </View>
    );
  }

  if (status === "failed") {
    return (
      <View
        style={[
          styles.container,
          styles.extraContainerStyle,
          {
            backgroundColor: paperTheme.colors.background,
          },
        ]}
      >
        <Image
          source={require("../../assets/images/error.png")}
          style={styles.image}
        />
        <Text style={styles.stateMessages}>
          {"Something went wrong, try searching for another city!"}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.flexOne,
        { backgroundColor: paperTheme.colors.background },
      ]}
    >
      <ScrollView style={styles.flexOne} showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.container,
            { backgroundColor: paperTheme.colors.background },
          ]}
        >
          <Card style={styles.verticalMargin}>
            <Card.Content>
              <View style={styles.flexRow}>
                <View style={styles.mainCardContainer}>
                  <Text style={styles.city} numberOfLines={1}>
                    {location?.name}
                  </Text>
                  <Text style={styles.weatherTempStyle}>
                    {currentData?.temp_c
                      ? `${Math.floor(currentData.temp_c)}°C`
                      : ""}
                  </Text>
                  <Text style={styles.weatherStateStyle}>
                    {currentData?.condition?.text}
                  </Text>
                  <Text style={styles.date}>
                    {dayjs(location?.localtime).format("D MMM YYYY / hh:mm a")}
                  </Text>
                </View>
                <Image
                  source={{ uri: "https:" + currentData?.condition?.icon }}
                  style={styles.weatherIconStyle}
                />
              </View>
            </Card.Content>
          </Card>

          <Card style={[styles.verticalMargin, styles.padding10]}>
            <View style={[styles.flexRow, styles.flexJustify]}>
              <WeatherStatItem
                iconSource="weather-windy"
                statValue={
                  currentData?.wind_kph
                    ? `${Math.floor(currentData?.wind_kph)} kph`
                    : ""
                }
                statInfo="Wind"
              />
              <WeatherStatItem
                iconSource="water-percent"
                statValue={`${currentData?.humidity} %`}
                statInfo="Humidity"
              />
              <WeatherStatItem
                iconSource="weather-rainy"
                statValue={`${chanceOfRain} %`}
                statInfo="Rain"
              />
              <WeatherStatItem
                iconSource="eye"
                statValue={`${currentData?.vis_km} km`}
                statInfo="Visibility"
              />
            </View>
          </Card>

          <View style={styles.tabBar}>
            <Button
              mode={selectedTab === "today" ? "contained" : "outlined"}
              onPress={() => setSelectedTab("today")}
              style={styles.tabButton}
            >
              Today
            </Button>
            <Button
              mode={selectedTab === "tomorrow" ? "contained" : "outlined"}
              onPress={() => setSelectedTab("tomorrow")}
              style={styles.tabButton}
            >
              Tomorrow
            </Button>
            <Button
              mode={selectedTab === "forecast" ? "contained" : "outlined"}
              onPress={() => setSelectedTab("forecast")}
              style={styles.tabButton}
            >
              {forecastData && forecastData.length > 1
                ? dayjs(forecastData[2]?.date).format("D MMM")
                : ""}
            </Button>
          </View>

          <View style={styles.verticalMargin}>
            {/* FlatList to Display Data */}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={
                selectedTab === "today"
                  ? currentData
                    ? forecastData?.[0]?.hour.map((hour) => ({
                        id: hour.time,
                        time: hour.time.split(" ")[1],
                        temperature: `${Math.floor(hour.temp_c)}°C`,
                        condition: hour.condition.text,
                        icon: "https:" + hour.condition.icon,
                      }))
                    : []
                  : selectedTab === "tomorrow"
                  ? forecastData?.[1]?.hour.map((hour) => ({
                      id: hour.time,
                      time: hour.time.split(" ")[1],
                      temperature: `${Math.floor(hour.temp_c)}°C`,
                      condition: hour.condition.text,
                      icon: "https:" + hour.condition.icon,
                    }))
                  : forecastData?.[2]?.hour.map((hour) => ({
                      id: hour.time,
                      time: hour.time.split(" ")[1],
                      temperature: `${Math.floor(hour.temp_c)}°C`,
                      condition: hour.condition.text,
                      icon: "https:" + hour.condition.icon,
                    }))
              }
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <WeatherCard
                  time={item.time}
                  temperature={item.temperature}
                  condition={item.condition}
                  icon={item.icon}
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  image: {
    width: scale(200),
    height: scale(200),
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(5),
  },
  extraContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  verticalMargin: {
    marginVertical: verticalScale(10),
  },
  flexRow: {
    flexDirection: "row",
  },
  mainCardContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  date: {
    fontSize: scale(12),
    fontFamily: fonts.regular,
    paddingTop: scale(2),
  },
  weatherStateStyle: {
    fontSize: scale(16),
    fontFamily: fonts.medium,
    paddingTop: scale(2),
  },
  stateMessages: {
    fontSize: scale(20),
    marginVertical: scale(10),
    fontFamily: fonts.bold,
    paddingHorizontal: scale(32),
    textAlign: "center",
  },
  city: {
    fontSize: scale(24),
    fontFamily: fonts.bold,
  },
  weatherTempStyle: {
    fontSize: scale(40),
    fontFamily: fonts.bold,
  },
  weatherIconStyle: {
    width: scale(100),
    height: scale(100),
    resizeMode: "contain",
    position: "absolute",
    right: scale(10),
    marginVertical: scale(10),
  },

  padding10: { padding: scale(10) },
  flexJustify: {
    justifyContent: "space-evenly",
  },

  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: verticalScale(10),
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  listItem: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
  },
  weatherStateContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.2,
  },
});
