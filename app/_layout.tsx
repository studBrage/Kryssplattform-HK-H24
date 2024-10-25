import { AuthSessionProvider } from "@/providers/authctx";
import { Slot, Stack } from "expo-router";

import "../global.css";

export default function RootLayout() {
  return (
    <AuthSessionProvider >
      <Slot />
    </AuthSessionProvider>
  );
}
