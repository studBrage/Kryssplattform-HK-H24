import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type UpsertUserProps = {
  closeModal: () => void;
  createUserName: (name: string) => void;
};

export default function UpsertUser({
  closeModal,
  createUserName,
}: UpsertUserProps) {
  const [userName, setUserName] = useState("");
  return (
    <View style={styles.mainContainer}>
      <View style={styles.textFieldContainer}>
        <Text>Skriv inn brukernavn</Text>
        <TextInput
          value={userName}
          onChangeText={setUserName}
          style={styles.textField}
          placeholder="Brukernavn"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.primaryButton}
          onPress={() => {
            createUserName(userName);
            setUserName("");
          }}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Lag bruker
          </Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={() => closeModal()}>
          <Text>Avbryt</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
    backgroundColor: "#F2ECE9",
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
  },
  textField: {
    borderWidth: 1,
    padding: 10,
    marginTop: 2,
    borderColor: "gray",
    borderRadius: 5,
  },
});
