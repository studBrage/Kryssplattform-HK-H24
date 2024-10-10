import { useAuthSession } from "@/providers/authctx";
import { storeData } from "@/utils/local_storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import * as authApi from "@/api/authApi";

const Authentication = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSignUp, setIsSignUp] = useState(false);

  const { signIn } = useAuthSession();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.mainContainer}>
        {isSignUp && (
          <View style={styles.textFieldContainer}>
            <Text>Brukernavn</Text>
            <TextInput
              value={userName}
              onChangeText={setUserName}
              style={styles.textField}
              placeholder="Brukernavn"
            />
          </View>
        )}
        <View style={styles.textFieldContainer}>
          <Text>Epost</Text>
          <TextInput
            value={userEmail}
            onChangeText={setUserEmail}
            style={styles.textField}
            placeholder="Epost"
          />
        </View>
        <View style={styles.textFieldContainer}>
          <Text>Passord</Text>
          <TextInput
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
            style={styles.textField}
            placeholder="Passord"
          />
        </View>
        {!isSignUp && (
          <Pressable
            style={{
              paddingTop: 24,
            }}
            onPress={() => {
              setIsSignUp(true);
            }}
          >
            <Text
              style={{
                textDecorationLine: "underline",
              }}
            >
              Lag bruker
            </Text>
          </Pressable>
        )}
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.primaryButton}
            onPress={() => {
              if (isSignUp) {
                authApi.signUp(userEmail, password, userName);
              } else {
                signIn(userEmail, password);
              }
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              {isSignUp ? "Lag bruker" : "Logg inn"}
            </Text>
          </Pressable>
          {isSignUp && (
            <Pressable
              style={styles.secondaryButton}
              onPress={() => setIsSignUp(false)}
            >
              <Text>Avbryt</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default Authentication;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  primaryButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: "#0096C7",
  },
  secondaryButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "gray",
  },
  textFieldContainer: {
    width: "100%",
    paddingTop: 16,
  },
  textField: {
    borderWidth: 1,
    padding: 10,
    marginTop: 2,
    borderColor: "gray",
    borderRadius: 5,
  },
});
