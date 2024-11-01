import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  Modal,
  RefreshControl,
  TextInput,
} from "react-native";

import { useEffect, useRef, useState } from "react";
import { Stack } from "expo-router";
import { getData, getItemWithSetter, storeData } from "@/utils/local_storage";
import PostForm from "@/components/PostForm";
import UpsertUser from "@/components/UpsertUser";
import { addNewPost, getAllPosts, toggleLike } from "@/utils/dummyPostData";
import { PostData } from "@/utils/postData";
import Post from "@/components/Post";
import Spacer from "@/components/Spacer";
import { useAuthSession } from "@/providers/authctx";
import * as postApi from "@/api/postApi";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export default function Index() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpsertUserModalOpen, setIsUpsertUserModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isDescending, setIsDescending] = useState(true);
  const [searchString, setSearchString] = useState("");

  //const [userName, setUserName] = useState<string | null>(null);
  const { userNameSession, signOut } = useAuthSession();

  const lastDocRef = useRef<QueryDocumentSnapshot<
    DocumentData,
    DocumentData
  > | null>(null);
  // const getSearchedPostsFromBackend = async (searchTerm: string) => {
  //   setRefreshing(true);
  //   const posts = await postApi.getLocalSearchedPosts(searchTerm);
  //   setPosts(posts);
  //   setRefreshing(false);
  // };

  // useEffect(() => {
  //   const delayDebounce = setTimeout(() => {
  //     console.log(searchString);
  //     getSearchedPostsFromBackend(searchString);
  //   }, 800);
  //   return () => clearTimeout(delayDebounce);
  // }, [searchString]);

  const getPostsFromLocal = async () => {
    const posts = await getData("posts");
    if (posts) {
      setPosts(JSON.parse(posts));
    }
  };

  const getPostsFromBackend = async () => {
    setRefreshing(true);
    const { result: newPosts, last: lastDoc } = await postApi.getPaginatedPosts(
      lastDocRef.current
    );
    lastDocRef.current = lastDoc;
    setPosts([...posts, ...newPosts]);
    setRefreshing(false);
  };

  // const getSortedPostsFromBakcend = async (isDesc: boolean) => {
  //   setRefreshing(true);
  //   const posts = await postApi.getSortedPosts(isDesc);
  //   setPosts(posts);
  //   setRefreshing(false);
  // };

  // useEffect(() => {
  //   getSortedPostsFromBakcend(isDescending);
  // }, [isDescending]);

  useEffect(() => {
    // getItemWithSetter("user", setUserName);
    // getPostsFromLocal();
    getPostsFromBackend();
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
              onPress={async () => {
                setIsDescending(!isDescending);
              }}
            >
              <Text>{isDescending ? "A-Å" : "Å-A"}</Text>
            </Pressable>
          ),
        }}
      />
      <Modal visible={isUpsertUserModalOpen} animationType="slide">
        <UpsertUser
          closeModal={() => setIsUpsertUserModalOpen(false)}
          createUserName={(name) => {
            //setUserName(name);
            storeData("user", name);
            setIsUpsertUserModalOpen(false);
          }}
        />
      </Modal>
      <Modal visible={isModalOpen} animationType="slide">
        <PostForm
          addNewPost={async () => {
            await getPostsFromBackend();
            setIsModalOpen(false);
          }}
          closeModal={() => setIsModalOpen(false)}
        />
      </Modal>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
        }}
      >
        <TextInput
          style={{
            borderWidth: 1,
            padding: 10,
            marginTop: 2,
            borderRadius: 5,
            width: "100%",
          }}
          value={searchString}
          onChangeText={(text) => setSearchString(text)}
        />
      </View>
      <FlatList
        style={{
          width: "100%",
          paddingHorizontal: 20,
        }}
        data={posts}
        ListHeaderComponent={() => <Spacer height={10} />}
        ListFooterComponent={() => <Spacer height={50} />}
        ItemSeparatorComponent={() => <Spacer height={8} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getPostsFromBackend}
          />
        }
        renderItem={(post) => (
          <Post
            key={post.index}
            postData={post.item}
            toggleLike={(id) => {
              const tempPosts = posts.map((tempPost) => {
                if (tempPost.id === id) {
                  return { ...tempPost, isLiked: !tempPost.isLiked };
                }
                return tempPost;
              });

              // setPosts(tempPosts);
              // storeData("posts", JSON.stringify(tempPosts));
            }}
          />
        )}
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
