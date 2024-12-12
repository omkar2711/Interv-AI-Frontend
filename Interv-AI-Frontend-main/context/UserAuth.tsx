import React, {
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import { getCookie } from "cookies-next";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
interface Iusercontext {
  isAuthenticated: boolean;
  user: {
    token: string | null;
    user: string | null;
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
      token: string | null;
      user: string | null;
    }>
  >;
  setAuthentication: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
  loading: boolean;
  intervData: Array<any>;
  setIntervData: React.Dispatch<React.SetStateAction<any>>;
}

export const UserContext = React.createContext<Iusercontext>({
  isAuthenticated: false,
  setAuthentication: () => {},
  user: {
    token: null,
    user: null,
  },
  setUser: () => {},
  logout: () => {},
  loading: false,
  intervData: [],
  setIntervData: () => {},
});

export function useUserContext() {
  return useContext(UserContext);
}

function UserAuth({ children }: PropsWithChildren<{}>) {
  const [isAuthenticated, setAuthentication] = useState(false);
  const [intervData, setIntervData] = useState([]);
  const [user, setUser] = useState<{
    token: string | null;
    user: string | null;
  }>({
    token: null,
    user: null,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("userauth");
    const user = getCookie("userInfo");
    if (token && user) {
      const userObj = JSON.parse(user);
      setUser({ token, user: userObj });
      setAuthentication(true);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    deleteCookie("userauth");
    deleteCookie("userInfo");
    setUser({
      token: null,
      user: null,
    });
    setAuthentication(false);
    router.push("/");
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        setAuthentication,
        loading,
        user,
        setUser,
        logout,
        intervData,
        setIntervData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserAuth;
