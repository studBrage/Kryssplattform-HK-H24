import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  Pressable,
  FlatList,
  Modal,
  TextInput,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { Link, Stack } from "expo-router";
import { getData, getItemWithSetter, storeData } from "@/utils/local_storage";
import PostForm from "@/components/PostForm";
import UpsertUser from "@/components/UpsertUser";
import { getAllPosts } from "@/utils/dummyPostData";
import { PostData } from "@/utils/postData";
import Post from "@/components/Post";
import Spacer from "@/components/Spacer";

export default function Index() {
  const [posts, setPosts] = useState<PostData[]>(getAllPosts());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpsertUserModalOpen, setIsUpsertUserModalOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    getItemWithSetter("user", setUserName);
  }, []);

  return (
    <View style={styles.titleContainer}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              style={{ paddingRight: 6 }}
              onPress={() => setIsModalOpen(true)}
            >
              <Text>Nytt innlegg</Text>
            </Pressable>
          ),
          headerLeft: () => (
            <Pressable
              style={{ paddingLeft: 6 }}
              onPress={() => setIsUpsertUserModalOpen(true)}
            >
              <Text>{userName ? userName : "Profil"}</Text>
            </Pressable>
          ),
        }}
      />
      <Modal visible={isUpsertUserModalOpen} animationType="slide">
        <UpsertUser
          closeModal={() => setIsUpsertUserModalOpen(false)}
          createUserName={(name) => {
            setUserName(name);
            storeData("user", name);
            setIsUpsertUserModalOpen(false);
          }}
        />
      </Modal>
      <Modal visible={isModalOpen} animationType="slide">
        <PostForm
          addNewPost={(post) => {
            setPosts([...posts, post]);
            setIsModalOpen(false);
          }}
          closeModal={() => setIsModalOpen(false)}
        />
      </Modal>
      <FlatList
        style={{
          width: "100%",
          paddingHorizontal: 20,
        }}
        data={posts}
        ListHeaderComponent={() => <Spacer height={10} />}
        ListFooterComponent={() => <Spacer height={50} />}
        ItemSeparatorComponent={() => <Spacer height={8} />}
        renderItem={(post) => <Post postData={post.item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  textFieldContainer: {
    width: "100%",
    flexDirection: "column",
    gap: 10,
    paddingHorizontal: 20,
  },
  textfield: {
    borderWidth: 1,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
