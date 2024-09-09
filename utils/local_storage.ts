import AsyncStorage from "@react-native-async-storage/async-storage"


export const storeData = async (key: string, data: string) => {
    try {
        await AsyncStorage.setItem(key, data);
    } catch (e) {
        // console.error(e);
    }
}

export const getData = async (key: string) => {
    try {
        const data = await AsyncStorage.getItem(key);
        if (data !== null) {
            console.log(data);
            return data;
        }
    } catch (e) {
        // console.error(e);
    }
}

// setValue er enda en callback funksjon, den sender ut igjen <storedValue>, i dette tilfellet sender vi value videre ut.
export const getItemWithSetter = async (key: string, setValue: (storedValue: string) => void) => {
    try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
    // Her sendes dataen ut
    setValue(value);
    }
    } catch (error) {
    console.error(error);
    }
}