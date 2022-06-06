import { SafeAreaView, View, Image, Alert } from "react-native";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  Spinner,
  Button,
  Text,
} from "@ui-kitten/components";
import React, { useEffect, useState } from "react";

const HomeScreen = () => {
  const [joke, setJoke] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchJoke = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      setJoke(null);
      const res = await fetch("https://api.chucknorris.io/jokes/random");
      const data = await res.json();
      setJoke(data.value);
    } catch {
      Alert.alert(
        "Unable to fetch joke",
        "Something went wrong, make sure you have internet access"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingHorizontal: 24,
          paddingVertical: 48,
        }}
      >
        <Image width={64} height={64} source={require("./assets/chuck.png")} />
        <View style={{ paddingVertical: 24 }}>
          {joke && <Text style={{ textAlign: "center" }}>{joke}</Text>}
          {isLoading && <Spinner size="giant" />}
        </View>
        <Button disabled={isLoading} onPress={fetchJoke}>
          Get new joke
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <HomeScreen />
    </ApplicationProvider>
  );
}
