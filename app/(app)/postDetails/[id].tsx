import { getPostById } from "@/utils/dummyPostData";
import { getPostFromLocalById } from "@/utils/local_storage";
import { PostData } from "@/utils/postData";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as postApi from "@/api/postApi";

export default function postDetails() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<PostData | null>(null);

  const fetchPostData = async () => {
    const post = await getPostFromLocalById(id as string);
    if (post) {
      setPost(post);
    }
  };

  const fetchPostFromBackend = async () => {
    const post = await postApi.getPostById(id as string);
    if (post) {
      setPost(post);
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
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: (props) => <Text>PostDetaljer</Text>,
        }}
      />
      <Text>{post?.title}</Text>
      <View
        style={{
          width: "100%",
          height: "50%",
        }}
      >
        {post ? (
          <MapView
            initialRegion={{
              latitude: post?.postCoordinates?.latitude ?? 0,
              longitude: post?.postCoordinates?.longitude ?? 0,
              latitudeDelta: 0.0122,
              longitudeDelta: 0.0122,
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Marker
              coordinate={{
                latitude: post?.postCoordinates?.latitude ?? 0,
                longitude: post?.postCoordinates?.longitude ?? 0,
              }}
            />
          </MapView>
        ) : (
          <Text>Laster kart</Text>
        )}
      </View>
    </View>
  );
}
