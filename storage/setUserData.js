import { AsyncStorage } from "react-native";

export default setUserData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.error(err);
  }
};
