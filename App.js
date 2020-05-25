import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import getUserData from "./storage/getUserData";
import getRefreshTokens from "./getRefreshTokens";
import getLyrics from "./getLyrics";

export default function App() {
  const [artist, setArtist] = useState("");
  const [songName, setSongName] = useState("");
  const [lyrics, setLyrics] = useState("");

  useEffect(() => {
    async function fetchMyExpirationTime() {
      const tokenExpirationTime = await getUserData("expirationTime");

      if (!tokenExpirationTime || Date.now() > tokenExpirationTime) {
        await getRefreshTokens();
      } else {
        getSong();
      }
    }
    fetchMyExpirationTime();
  }, []);

  useEffect(() => {
    async function fetchLyrics() {
      const lyrics = await getLyrics(artist, songName);
      setLyrics(lyrics);
    }
    fetchLyrics();
  }, [artist]);

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

    setSongName(respJson["item"]["name"]);
    setArtist(respJson["item"]["artists"][0]["name"]);
  }
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={{ paddingBottom: 20 }}>
          {artist} - {songName}
        </Text>
        <Text>{lyrics}</Text>
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
