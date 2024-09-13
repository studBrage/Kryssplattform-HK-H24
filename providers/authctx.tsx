import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  signIn: (username: string) => void;
  signOut: VoidFunction;
  userNameSession?: string | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  signIn: (s: string) => null,
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

  useEffect(() => {
    AsyncStorage.getItem("authSession").then((value) => {
      setUserSession(value);
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: (userName: string) => {
          setUserSession(userName);
        },
        signOut: () => {
          setUserSession(null);
        },
        userNameSession: userSession,
        isLoading: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
