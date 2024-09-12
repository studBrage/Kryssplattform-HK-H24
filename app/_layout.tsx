import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          title: "Hjem",
          animation: "slide_from_left",
        }}
      />
      <Stack.Screen name="postDetails/[id]" />
      <Stack.Screen name="authentication" />
    </Stack>
  );
}
