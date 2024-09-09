import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          title: "Hjem",
        }}
      />
      <Stack.Screen name="postDetails/[id]" />
    </Stack>
  );
}
