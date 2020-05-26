import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import getUserData from "./storage/getUserData";
import getRefreshTokens from "./getRefreshTokens";
import getLyrics from "./getLyrics";
import useInterval from "./useInterval";

export default function App() {
  const [lyrics, setLyrics] = useState("");
  const [songAndArtist, setSongAndArtist] = useState(["", ""]);
  const [count, setCount] = useState(0);

  useInterval(async () => {
    const tokenExpirationTime = await getUserData("expirationTime");

    if (!tokenExpirationTime || Date.now() > tokenExpirationTime) {
      await getRefreshTokens();
    }
    await getSong();
    setCount(count + 1);
  }, 1000);

  useEffect(() => {
    async function fetchLyrics() {
      setLyrics("");
      let lyrics = await getLyrics(songAndArtist[1], songAndArtist[0]);
      setLyrics(lyrics);
    }
    fetchLyrics();
  }, [songAndArtist]);

  async function getSong() {
    const accessToken = await getUserData("accessToken");
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const respJson = await response.json();
    if (
      respJson["item"]["name"] != songAndArtist[0] ||
      respJson["item"]["artists"][0]["name"] != songAndArtist[1]
    ) {
      setSongAndArtist([
        respJson["item"]["name"],
        respJson["item"]["artists"][0]["name"],
      ]);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={{ paddingBottom: 20 }}>
          {songAndArtist[1]} - {songAndArtist[0]}
        </Text>
        {lyrics ? <Text>{lyrics}</Text> : <ActivityIndicator size="large" />}
        <View style={{ paddingBottom: 50 }}></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
