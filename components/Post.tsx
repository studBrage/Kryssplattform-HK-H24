import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";
import { PostData } from "@/utils/postData";

type PostProps = {
  postData: PostData;
};

export default function Post({ postData }: PostProps) {
  const [liked, setLiked] = useState(false);

  return (
    <Link
      href={{
        pathname: "/postDetails/[id]",
        params: { id: postData.id },
      }}
      asChild
    >
      <Pressable>
        <View style={styles.postContainer}>
          <View style={styles.textContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.postTitle}>{postData.title}</Text>
              <Pressable onPress={() => setLiked(!liked)}>
                {/* Ikon hentet fra https://icons.expo.fyi/Index, en ikondatabase for expo. Prøv dere fram med egne ikoner ved å følge lenken! */}
                <AntDesign
                  name="smileo"
                  size={24}
                  color={liked ? "#23C9FF" : "gray"}
                />
              </Pressable>
            </View>
            <Text style={styles.postContent}>{postData.description}</Text>
            <View style={styles.bottomContainer}>
              <Text style={styles.postHashtags}>{postData.hashtags}</Text>
              <Text style={styles.authorText}>{postData.author}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 6 },
    shadowColor: "black",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    borderRadius: 10,
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingTop: 16,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  postContent: {
    fontSize: 14,
    paddingTop: 6,
    color: "gray",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  postHashtags: {
    paddingTop: 16,
    fontSize: 12,
    color: "gray",
  },
  authorText: {
    fontSize: 12,
    color: "gray",
    textDecorationLine: "underline",
  },
});
