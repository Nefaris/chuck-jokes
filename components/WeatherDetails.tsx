import { CityWeatherData } from "../types";
import React, { FC, ReactNode } from "react";
import { Text, useTheme } from "@ui-kitten/components";
import { View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  weatherData: CityWeatherData;
};

const PropertyTile = ({ icon, value }: { icon: ReactNode; value: string }) => {
  const theme = useTheme();

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        borderColor: theme["color-basic-500"],
        backgroundColor: theme["color-basic-100"],
        borderWidth: 1,
        borderRadius: 12,
        padding: 18,
        flexGrow: 1,
        flexBasis: 100,
        marginRight: 12,
        marginBottom: 12,
      }}
    >
      {icon}
      <Text style={{ marginTop: 6 }}>{value}</Text>
    </View>
  );
};

const WeatherDetails: FC<Props> = ({ weatherData }) => {
  return (
    <View>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
        {weatherData.name}, {weatherData.weather[0].description}
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 12,
          marginRight: -12,
          marginBottom: -12,
        }}
      >
        <PropertyTile
          icon={<FontAwesome5 name="temperature-high" size={24} />}
          value={`${weatherData.main.temp.toFixed(0)} °C`}
        />
        <PropertyTile
          icon={<MaterialCommunityIcons name="water-percent" size={36} />}
          value={`${weatherData.main.humidity} %`}
        />
        <PropertyTile
          icon={<AntDesign name="clouddownload" size={24} />}
          value={`${weatherData.main.pressure} hPa`}
        />
      </View>
    </View>
  );
};

export default WeatherDetails;
