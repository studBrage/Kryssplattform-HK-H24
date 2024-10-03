import { getPostById } from "@/utils/dummyPostData";
import { getPostFromLocalById } from "@/utils/local_storage";
import { PostData } from "@/utils/postData";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, Image, Pressable, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as postApi from "@/api/postApi";
import * as Location from "expo-location";

export default function postDetails() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<PostData | null>(null);
  const [postLocation, setPostLocation] = useState("Laster");

  const router = useRouter();

  const fetchPostData = async () => {
    const post = await getPostFromLocalById(id as string);
    if (post) {
      setPost(post);
    }
  };

  const fetchPostFromBackend = async () => {
    const backendPost = await postApi.getPostById(id as string);
    if (backendPost) {
      setPost(backendPost);
      const location = await Location.reverseGeocodeAsync({
        latitude: backendPost.postCoordinates?.latitude ?? 0,
        longitude: backendPost.postCoordinates?.longitude ?? 0,
      });
      setPostLocation(location[0].name ?? "Ukjent");
    }
  };

  useEffect(() => {
    // fetchPostData();
    fetchPostFromBackend();
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: (props) => <Text>PostDetaljer</Text>,
          headerRight: () => (
            <Pressable
              onPress={async () => {
                await postApi.deletePost(id as string);
                router.back();
              }}
            >
              <Text>Slett innlegg</Text>
            </Pressable>
          ),
        }}
      />

      <Image style={styles.imageStyle} source={{ uri: post?.imageURL }} />
      <View style={styles.contentContainer}>
        <Text style={styles.titleStyle}>{post?.title}</Text>
        <Text style={[styles.textStyle, { paddingTop: 6 }]}>
          {post?.description}
        </Text>
        <View style={styles.postDataContainer}>
          <Text style={[styles.textStyle, { color: "grey" }]}>
            {post?.hashtags}
          </Text>
          <Text
            style={[
              styles.textStyle,
              { color: "gray", textDecorationLine: "underline" },
            ]}
          >
            {post?.author}
          </Text>
        </View>
        {post && (
          <View style={styles.mapContainer}>
            <Text style={[styles.textStyle, { color: "grey" }]}>
              {`Sted: ${postLocation}`}
            </Text>
            <MapView
              zoomEnabled={false}
              scrollEnabled={false}
              rotateEnabled={false}
              pitchEnabled={false}
              initialRegion={{
                latitude: post?.postCoordinates?.latitude ?? 0,
                longitude: post?.postCoordinates?.longitude ?? 0,
                latitudeDelta: 0.0082,
                longitudeDelta: 0.0081,
              }}
              style={styles.mapStyle}
            >
              <Marker
                coordinate={{
                  latitude: post?.postCoordinates?.latitude ?? 0,
                  longitude: post?.postCoordinates?.longitude ?? 0,
                }}
              />
            </MapView>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  titleStyle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  textStyle: {
    fontSize: 16,
  },
  postDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
  },
  mapContainer: {
    width: "100%",
    height: 250,
    paddingTop: 64,
  },
  mapStyle: {
    marginTop: 8,
    width: "100%",
    height: "100%",
  },
});
