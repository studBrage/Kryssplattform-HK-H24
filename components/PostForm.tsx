import { PostData } from "@/utils/postData";
import { useEffect, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import SelectImageModal from "./SelectImageModal";

import * as Location from "expo-location";
import * as postApi from "@/api/postApi";

type PostFormProps = {
  addNewPost: () => void;
  closeModal: () => void;
};

export default function PostForm({ addNewPost, closeModal }: PostFormProps) {
  const [titleText, setTitleText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [hashtagText, setHashtagText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const [statusText, setStatusText] = useState<string | null>(null);
  const [location, setLocation] =
    useState<Location.LocationGeocodedAddress | null>(null);

  const postCoordinatesData = useRef<Location.LocationObjectCoords | null>(
    null
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setStatusText("Tillatelse til å bruke lokasjon ble ikke gitt");
        return;
      }
    })();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setStatusText("Tillatelse til å bruke lokasjon ble ikke gitt");
      return;
    }

    let location = await Location.getCurrentPositionAsync();
    postCoordinatesData.current = location.coords;
    const locationAddress = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setLocation(locationAddress[0]);
  };

  let text = "Dette blir en kul geolokasjon wow!";
  if (statusText) {
    text = statusText;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets
      >
        <View style={styles.contentContainer}>
          <Modal visible={isCameraOpen} animationType="slide">
            <SelectImageModal
              closeModal={() => {
                setIsCameraOpen(false);
                getLocation();
              }}
              setImage={setImage}
            />
          </Modal>
          <Pressable
            onPress={() => setIsCameraOpen(true)}
            style={styles.addImageBox}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ resizeMode: "cover", width: "100%", height: 300 }}
                alt="Hmmmmm"
              />
            ) : (
              <EvilIcons name="image" size={80} color="gray" />
            )}
          </Pressable>
          <Text>{`${location?.street} ${location?.streetNumber} - ${location?.city}, ${location?.country}`}</Text>
          <View style={styles.textFieldContainer}>
            <Text style={styles.text}>Tittel</Text>
            <TextInput
              onChangeText={setTitleText}
              value={titleText}
              style={styles.textfield}
              placeholder="Skriv inn tittel"
            />
          </View>
          <View style={styles.textFieldContainer}>
            <Text style={styles.text}>Beskrivelse</Text>
            <TextInput
              multiline
              numberOfLines={3}
              onChangeText={setDescriptionText}
              value={descriptionText}
              style={[styles.textfield, { height: 84 }]}
              placeholder="Skriv inn beskrivelse"
            />
          </View>
          <View style={styles.textFieldContainer}>
            <Text style={styles.text}>Hashtags</Text>
            <TextInput
              onChangeText={setHashtagText}
              value={hashtagText}
              style={styles.textfield}
              placeholder="#kultur #natur #mat"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.primaryButton}
              onPress={async () => {
                const newPost: PostData = {
                  title: titleText,
                  description: descriptionText,
                  // midler for å generere en ikke fullt så unik id, hvis to poster har samme tittel vil det dukke opp en warning om children with the same key
                  // Dette løser seg selv når vi kan få unike IDer fra en backend
                  id: `postName-${titleText}`,
                  hashtags: hashtagText,
                  author: "Kul student",
                  isLiked: false,
                  imageURL: image || "",
                  postCoordinates: postCoordinatesData.current,
                };
                await postApi.createPost(newPost);
                addNewPost();
                setTitleText("");
                setDescriptionText("");
                setHashtagText("");
              }}
            >
              <Text style={{ color: "white" }}>Legg til post</Text>
            </Pressable>
            <Pressable
              style={styles.secondaryButton}
              onPress={() => closeModal()}
            >
              <Text
                style={{
                  color: "#412E25",
                }}
              >
                Avbryt
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    paddingTop: 72,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    width: "100%",
    flexDirection: "column",
    paddingHorizontal: 20,
  },
  textFieldContainer: {
    paddingTop: 8,
  },
  addImageBox: {
    borderRadius: 10,
    overflow: "hidden",
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
  },
  text: {},
  textfield: {
    borderWidth: 1,
    padding: 10,
    marginTop: 2,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  primaryButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: "#0096C7",
  },
  secondaryButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "gray",
  },
});
