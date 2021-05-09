import { encode as btoa } from "base-64";
import getAuthorizationCode from "./getAuthorizationCode";
import spotifyCredentials from "../secrets";
import * as AuthSession from "expo-auth-session";
import setUserData from "../storage/setUserData";

const getTokens = async () => {
  console.log("getTokens");
  try {
    const authorizationCode = await getAuthorizationCode();
    console.log(authorizationCode);
    const credsB64 = btoa(
      `${spotifyCredentials.CLIENT_ID}:${spotifyCredentials.CLIENT_SECRET}`
    );
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credsB64}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${spotifyCredentials.REDIRECT_URI}`,
    });

    const responseJson = await response.json();
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    } = responseJson;

    const expirationTime = Date.now() + expiresIn * 1000;
    await setUserData("accessToken", accessToken);
    await setUserData("refreshToken", refreshToken);
    await setUserData("expirationTime", expirationTime.toString());
  } catch (err) {
    console.error(err);
  }
};

export default getTokens;
