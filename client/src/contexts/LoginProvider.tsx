import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import {
  loginPages,
  loginRestrictedPages,
  validateToken,
} from "@/utils/common";

interface LoginContextInterface {
  isLoggedIn: boolean;
  refreshLoginState: () => void;
}

const LoginContext = createContext<LoginContextInterface>({
  isLoggedIn: false,
  refreshLoginState: () => {},
});

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const router = useLocation();
  const navigate = useNavigate();

  const path = router.pathname;

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLogInChecked, setIsLogInChecked] = useState<boolean>(false);

  const refreshLoginState = () => {
    const token = Cookies.get("userToken");
    const isValidToken = validateToken(token);
    setIsLoggedIn(isValidToken);
    setIsLogInChecked(true);
  };

  useEffect(() => {
    const token = Cookies.get("userToken");

    if (!token && loginRestrictedPages.includes(path)) {
      navigate("login/?ua=" + true, { replace: true });
      return;
    } else if (token && loginPages.includes(path)) {
      navigate("/", { replace: true });
      return;
    } else {
      refreshLoginState();
    }
  }, [router, path]);

  if (!isLogInChecked) {
    return <div className="w-[100vw] h-[100vh] bg-app-gray-700"></div>;
  }

  return (
    <LoginContext.Provider value={{ isLoggedIn, refreshLoginState }}>
      {children}
    </LoginContext.Provider>
  );
};

export const UseLogin = () => useContext(LoginContext);
