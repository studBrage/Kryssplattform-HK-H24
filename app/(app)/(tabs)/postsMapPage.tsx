import { getData } from "@/utils/local_storage";
import { PostData } from "@/utils/postData";
import { useEffect, useState } from "react";
import { Text, View, Image, Pressable, StyleSheet } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { router } from "expo-router";

export default function postsMapPage() {
  const [posts, setPosts] = useState<PostData[]>([]);

  const getPostsFromLocal = async () => {
    const posts = await getData("posts");
    if (posts) {
      setPosts(JSON.parse(posts));
    }
  };

  useEffect(() => {
    getPostsFromLocal();
  }, []);

  return (
    <View>
      <MapView
        initialRegion={{
          latitude: 59.917104578,
          longitude: 10.727706144,
          latitudeDelta: 0.0422,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {posts.length > 0 &&
          posts.map((post) => (
            <Marker
              coordinate={{
                latitude: post.postCoordinates?.latitude ?? 0,
                longitude: post.postCoordinates?.longitude ?? 0,
              }}
              key={post.id}
            >
              <Callout>
                <Pressable
                  onPress={() => {
                    router.navigate({
                      pathname: "/postDetails/[id]",
                      params: { id: post.id },
                    });
                  }}
                >
                  <View style={styles.postPreviewContainer}>
                    <View style={{ paddingBottom: 16 }}>
                      <Image
                        style={styles.postImage}
                        source={{ uri: post.imageURL }}
                      />
                    </View>
                    <Text style={styles.postTitle}>{post?.title}</Text>
                    <Text>{post?.description}</Text>
                  </View>
                </Pressable>
              </Callout>
            </Marker>
          ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  postPreviewContainer: {
    width: 200,
    height: 200,
  },
  postImage: {
    width: 200,
    height: 150,
    resizeMode: "cover",
  },
  postTitle: {
    fontWeight: "bold",
  },
  postDescription: {},
});
