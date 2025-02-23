import { Button, Dimensions, Image, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../ThemeContext";
import CustomTextInput from "../../components/CustomTextInput";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Card, Icon, IconButton, Text } from "react-native-paper";
import { fonts } from "../../constants/fonts";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

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
  <View style={{ justifyContent: "center", alignItems: "center" }}>
    <Icon size={24} source={iconSource} />
    <Text style={styles.weatherStateStyle}>{statValue}</Text>
    <Text style={styles.date}>{statInfo}</Text>
  </View>
);

const Home = () => {
  const { theme, paperTheme } = useTheme();
  const [search, setSearch] = useState("");
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: paperTheme.colors.background },
      ]}
    >
      <View style={styles.searchContainer}>
        <CustomTextInput
          value={search}
          onChangeText={(text) => setSearch(text)}
          placeholder="Enter City Name"
          style={styles.searchBox}
        />
        <IconButton
          icon="text-search"
          size={30}
          mode="contained"
          onPress={() => console.log("Pressed")}
        />
      </View>
      <Card style={styles.verticalMargin}>
        <Card.Content>
          <View style={styles.flexRow}>
            <View style={styles.mainCardContainer}>
              <Text style={styles.date}>04 August 2024</Text>
              <Text style={styles.weatherStateStyle}>Cloudy</Text>
              <Text style={styles.weatherTempStyle}>18°C</Text>
            </View>
            <Image
              source={require("../../assets/images/clear.png")}
              style={styles.weatherIconStyle}
            />
          </View>
        </Card.Content>
      </Card>

      <Card style={[styles.verticalMargin, styles.padding10]}>
        <View style={[styles.flexRow, styles.flexJustify]}>
          <WeatherStatItem
            iconSource="weather-windy"
            statValue="10 m/s"
            statInfo="Wind"
          />
          <WeatherStatItem
            iconSource="water-percent"
            statValue="98%"
            statInfo="Humidity"
          />
          <WeatherStatItem
            iconSource="weather-rainy"
            statValue="100%"
            statInfo="Rain"
          />
        </View>
      </Card>

      {/* <Button title="Toggle Theme" onPress={toggleTheme} /> */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(5),
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  searchBox: {
    width: width * 0.8,
    height: verticalScale(40),
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
    fontSize: scale(10),
    fontFamily: fonts.regular,
    paddingTop: scale(2),
  },
  weatherStateStyle: {
    fontSize: scale(14),
    fontFamily: fonts.medium,
    paddingTop: scale(2),
  },
  weatherTempStyle: {
    fontSize: scale(40),
    fontFamily: fonts.bold,
  },
  weatherIconStyle: {
    width: scale(120),
    height: scale(120),
    position: "absolute",
    right: 10,
    alignSelf: "center",
  },
  padding10: { padding: scale(10) },
  flexJustify: {
    justifyContent: "space-evenly",
  },
});
