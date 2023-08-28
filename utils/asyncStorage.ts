import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch ({ message }: any) {
    alert(message);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch ({ message }: any) {
    alert(message);
  }
};

export const storeSearchData = async (keyword: any) => {
  try {
    const value = await AsyncStorage.getItem("@searchWords");
    const searchedValue = value ? JSON.parse(value) : [];
    searchedValue.push(keyword);
    const duplicateRemoved = new Set(searchedValue);
    let originalArray = Array.from(duplicateRemoved);
    await AsyncStorage.setItem("@searchWords", JSON.stringify(originalArray));
  } catch ({ message }: any) {
    alert(message);
  }
};

export const getSearchData = async () => {
  try {
    const value = await AsyncStorage.getItem("@searchWords");
    return value ? JSON.parse(value) : [];
  } catch ({ message }: any) {
    alert(message);
  }
};
