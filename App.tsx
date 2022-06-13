import { Image, SafeAreaView, ScrollView, View } from "react-native";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  Button,
  Input,
  Spinner,
  Text,
} from "@ui-kitten/components";
import React, { useState } from "react";
import WeatherDetails from "./components/WeatherDetails";
import { CityWeatherData } from "./types";

const HomeScreen = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<CityWeatherData | null>(null);

  const getBackground = (city: string) => {
    return `https://source.unsplash.com/random/?${city}`;
  };

  const handleSearch = async () => {
    if (isLoading) return;
    setWeatherData(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=7819048336ed41056839c4c33ec14fc1`;
      const response = await fetch(url);
      setWeatherData(await response.json());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{
          uri: weatherData
            ? getBackground(weatherData.name)
            : "https://source.unsplash.com/random/?sky,clouds,day",
        }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.5,
        }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ padding: 24 }}>
          <Text
            style={{
              fontSize: 42,
              fontWeight: "bold",
              marginBottom: 24,
            }}
          >
            Weather
          </Text>

          <Text style={{ marginBottom: 6, fontWeight: "600" }}>City name</Text>

          <Input
            placeholder="Roma, Berlin, ..."
            value={searchValue}
            onChangeText={(val) => setSearchValue(val)}
          />
          <View style={{ marginTop: 6 }}>
            <Button onPress={handleSearch}>Check!</Button>
          </View>

          <View style={{ marginTop: 24 }}>
            {isLoading && <Spinner size="giant" />}
            {weatherData && <WeatherDetails weatherData={weatherData} />}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <HomeScreen />
    </ApplicationProvider>
  );
}
