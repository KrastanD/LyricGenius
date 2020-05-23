import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import getUserData from "./storage/getUserData";
import getRefreshTokens from "./getRefreshTokens";

export default function App() {
  const [accessTokenAvailable, setAccessTokenAvailability] = useState(false);

  useEffect(() => {
    async function fetchMyExpirationTime() {
      const tokenExpirationTime = await getUserData("expirationTime");
      if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
        await getRefreshTokens();
      } else {
        setAccessTokenAvailability(true);
      }
    }
    fetchMyExpirationTime();
  }, []);
  async function fetchMyToken() {
    const accessToken = await getUserData("accessToken");
    console.log(accessToken);
  }
  fetchMyToken();
  return (
    <View style={styles.container}>
      <Text>Token is available:</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
