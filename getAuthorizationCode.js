import * as AuthSession from "expo-auth-session";
import spotifyCredentials from "./secrets";

const scopesArr = ["user-read-currently-playing", "user-read-playback-state"];

const scopes = scopesArr.join(" ");

const getAuthorizationCode = async () => {
  try {
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
  } catch (err) {
    console.error(err);
  }
};

export default getAuthorizationCode;
