import { auth } from "@/firebaseConfig";
import { GoogleSignin, isSuccessResponse } from "@react-native-google-signin/google-signin";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export const signIn = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User signed in", userCredential);
    })
    .catch((error) => {
      console.log("Oops, kunne ikke logge inn", error);
    });
};

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    if (isSuccessResponse(response)) {
      const user = GoogleSignin.getCurrentUser();
      if (user) {
        const googleCredential = GoogleAuthProvider.credential(user.idToken);
        const userCrednetial = await signInWithCredential(auth, googleCredential);
        console.log("User signed in with google", userCrednetial.user.email)
        console.log("User signed in with google", userCrednetial.user.displayName)
      }
    }
  } catch (error) {
    console.log("Error signing in with google", error);
  }
};

export const signOut = async () => {
  await auth.signOut().then(() => {
    console.log("Signed out");
  });
};

export const signUp = (email: string, password: string, username: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      await updateProfile(userCredential.user, {
        displayName: username,
      });
      console.log("User signed up", userCredential.user.email);
      console.log("User signed up", userCredential.user.displayName);
    })
    .catch((error) => {
      console.log(`Oops! ${error.code} message: ${error.message}`);
    });
};
