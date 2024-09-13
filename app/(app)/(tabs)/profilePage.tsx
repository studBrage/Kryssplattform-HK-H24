import { useAuthSession } from "@/providers/authctx";
import { clearAll, getItemWithSetter } from "@/utils/local_storage";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function ProfilePage() {
  //const [userName, setUserName] = useState<string | null>(null);
  const { userNameSession, signOut } = useAuthSession();

  const router = useRouter();

  // useEffect(() => {
  //   getItemWithSetter("user", setUserName);
  // }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.textStyle}>Hei {userNameSession}!</Text>

      <View
        style={{
          paddingTop: 20,
        }}
      >
        {userNameSession ? (
          <Pressable
            style={styles.alertButton}
            onPress={async () => {
              signOut();

              // router.push("/authentication");
            }}
          >
            <Text style={{ color: "white" }}>Logg ut</Text>
          </Pressable>
        ) : (
          <Link
            asChild
            href={{
              pathname: "/authentication",
            }}
          >
            <Pressable style={styles.primaryButton}>
              <Text style={{ color: "white" }}>Logg inn</Text>
            </Pressable>
          </Link>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: "#0096C7",
  },
  alertButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: "#D9021D",
  },
  textStyle: {
    fontSize: 20,
  },
});
