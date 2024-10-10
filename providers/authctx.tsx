import { auth } from "@/firebaseConfig";
import { deleteData, storeData } from "@/utils/local_storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as authApi from "@/api/authApi";

type AuthContextType = {
  signIn: (username: string, password: string) => void;
  signOut: VoidFunction;
  userNameSession?: string | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  signIn: (s: string, p: string) => null,
  signOut: () => null,
  userNameSession: null,
  isLoading: false,
});

export function useAuthSession() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error(
      "UseAuthSession must be used within a AuthContext Provider"
    );
  }

  return value;
}

export function AuthSessionProvider({ children }: { children: ReactNode }) {
  const [userSession, setUserSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserSession(user.displayName);
      } else {
        setUserSession(null);
      }
      router.replace("/");
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (userName: string, password: string) => {
          await authApi.signIn(userName, password);
          // setUserSession(userName);
          // storeData("authSession", userName);
        },
        signOut: async () => {
          await authApi.signOut();
          // setUserSession(null);
          // deleteData("authSession");
        },
        userNameSession: userSession,
        isLoading: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
