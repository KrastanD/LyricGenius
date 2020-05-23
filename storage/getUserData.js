import { AsyncStorage } from "react-native";

export default getUserData = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (err) {
    console.error(err);
  }
};
