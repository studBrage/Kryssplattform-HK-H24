import HkButton from "@/components/HkButton";
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
      className="flex-1 justify-center items-center bg-slate-600"
      // style={{
      //   flex: 1,
      //   justifyContent: "center",
      //   alignItems: "center",
      // }}
    >
      <Text style={styles.textStyle}>Hei {userNameSession}!</Text>

      <View
        style={{
          paddingTop: 20,
        }}
      >
        {userNameSession ? (
          <Pressable
            // style={styles.alertButton}
            className="bg-red-500"
            onPress={async () => {
              signOut();

              // router.push("/authentication");
            }}
          >
            <Text className="italic font-bold">Logg ut</Text>
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
        <HkButton italic theme="primary" title="Knapp!" onPress={() => {}} />
        <HkButton bold theme="alert" title="Knapp!" onPress={() => {}} />
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
