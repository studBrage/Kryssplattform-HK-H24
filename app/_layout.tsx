import { AuthSessionProvider } from "@/providers/authctx";
import { Slot, Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthSessionProvider >
      <Slot />
    </AuthSessionProvider>
  );
}
