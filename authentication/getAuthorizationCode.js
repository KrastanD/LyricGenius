import * as AuthSession from "expo-auth-session";
import spotifyCredentials from "../secrets";
import axios from "axios";
import { Platform } from "react-native";

const scopesArr = ["user-read-currently-playing", "user-read-playback-state"];

const scopes = scopesArr.join(" ");

const getAuthorizationCode = async () => {
  try {
    if (Platform.OS == "android") {
      const result = await AuthSession.startAsync({
        authUrl:
          "https://accounts.spotify.com/authorize" +
          "?response_type=code" +
          "&client_id=" +
          spotifyCredentials.CLIENT_ID +
          (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
          "&redirect_uri=" +
          encodeURIComponent(spotifyCredentials.REDIRECT_URI),
      });
      return result.params.code;
    } else {
      const result = await fetch(
        "https://accounts.spotify.com/authorize" +
          "?response_type=code" +
          "&client_id=" +
          spotifyCredentials.CLIENT_ID +
          (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
          "&redirect_uri=" +
          encodeURIComponent(spotifyCredentials.REDIRECT_URI),
        { method: "GET", mode: "no-cors" }
      );
      return result.params.code;
    }
  } catch (err) {
    console.error(err);
  }
};

export default getAuthorizationCode;
