import React from "react";
import { StyleSheet, Image } from "react-native";
import { Card, Text } from "react-native-paper";
import { useTheme } from "../ThemeContext";
import { scale, verticalScale } from "react-native-size-matters";
import { width } from "../constants/sizes";
import { fonts } from "../constants/fonts";

interface WeatherCardProps {
  time?: string;
  icon: string;
  temperature: string;
  condition: string;
}

export default function WeatherCard({
  time,
  icon,
  temperature,
  condition,
}: WeatherCardProps) {
  const { paperTheme } = useTheme();

  return (
    <Card style={[styles.card]}>
      <Card.Content>
        <Text style={[styles.title]}>{time}</Text>
        <Image source={{ uri: icon }} style={styles.weatherIconHour} />
        <Text style={[styles.text]}>{temperature}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    width: width * 0.3,
    height: width * 0.5,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.bold,
    marginBottom: verticalScale(10),
    alignSelf: "center",
  },
  text: {
    fontSize: 22,
    fontFamily: fonts.bold,
    alignSelf: "center",
    marginTop: verticalScale(10),
  },
  weatherIconHour: {
    width: scale(50),
    height: scale(50),
    alignSelf: "center",
  },
});
