import AsyncStorage from "@react-native-async-storage/async-storage";

const setUserData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.error(err);
  }
};

export default setUserData;
