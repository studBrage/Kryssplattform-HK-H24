import { getPostById } from "@/utils/dummyPostData";
import { getPostFromLocalById } from "@/utils/local_storage";
import { PostData } from "@/utils/postData";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function postDetails() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<PostData | null>(null);

  const fetchPostData = async () => {
    const post = await getPostFromLocalById(id as string);
    if (post) {
      setPost(post);
    }
  };

  fetchPostData();

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
    </View>
  );
}
