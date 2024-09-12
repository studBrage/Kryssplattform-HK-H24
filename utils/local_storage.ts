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

export const getPostFromLocalById = async (id: string) => {
    try {
        const posts = await AsyncStorage.getItem("posts");
        if (posts !== null) {
            const parsedPosts = JSON.parse(posts);
            const post = parsedPosts.find((post: any) => post.id === id);
            return post;
        }
    } catch (e) {
        // console.error(e);
    }
}

export const isUserLoggedIn = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        return true;
      }
    }
    catch (error) {
      console.error(error);
    }
    return false;
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

// Innebygd funksjon .clear() som sletter all data i local storage
export const clearAll = async () => {
    try {
    await AsyncStorage.clear()
    } catch(e) {
    // clear error
    }
    console.log('Done.')
    }