import { useAuthSession } from "@/providers/authctx";
import { Redirect, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function AppLayout() {
  const { userNameSession, isLoading } = useAuthSession();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Henter bruker...</Text>
      </View>
    );
  }

  if (!userNameSession) {
    return <Redirect href="/authentication" />
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          title: "Tilbake",
          animation: "slide_from_left",
        }}
      />
      <Stack.Screen name="postDetails/[id]" />
    </Stack>
  );
}
