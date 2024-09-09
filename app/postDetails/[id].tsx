import { getPostById } from "@/utils/dummyPostData";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function postDetails() {
  const { id } = useLocalSearchParams();
  const post = getPostById(id as string);

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
