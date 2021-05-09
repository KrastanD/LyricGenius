import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserData = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (err) {
    console.error(err);
  }
};

export default getUserData;
