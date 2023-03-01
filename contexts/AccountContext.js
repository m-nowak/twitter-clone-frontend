import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import dayjs from "dayjs";
import mem from "mem";

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  let token = Cookies.get("access");

  // -------------------------------------------------------------------------------------------------
  // Private Axios
  // -------------------------------------------------------------------------------------------------

  const privateConfig = {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const privateInstanceRef = useRef(axios.create(privateConfig));

  useEffect(() => {
    privateInstanceRef.current.interceptors.request.use(
      async (config) => {
        token = Cookies.get("access");

        if (token && token !== undefined) {
          const user = jwt_decode(token);
          const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
          if (isExpired) {
            const result = await memoizedRefreshToken();
            token = Cookies.get("access");
          }
          config.headers = {
            ...config.headers,
            authorization: `Bearer ${token}`,
          };
        } else {
          setUser(null);
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
  }, []);

  const privateInstance = privateInstanceRef.current;

  // -------------------------------------------------------------------------------------------------
  // Public Axios
  // -------------------------------------------------------------------------------------------------

  const publicConfig = {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const publicInstanceRef = useRef(axios.create(publicConfig));
  const publicInstance = publicInstanceRef.current;

  // -------------------------------------------------------------------------------------------------
  // Next API Axios
  // -------------------------------------------------------------------------------------------------

  const nextConfig = {
    baseURL: process.env.NEXT_PUBLIC_NEXT_URL,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const nextInstanceRef = useRef(axios.create(nextConfig));
  const nextInstance = nextInstanceRef.current;

  // -------------------------------------------------------------------------------------------------
  // Refresh Token
  // -------------------------------------------------------------------------------------------------

  const refreshToken = async () => {
    try {
      const { data } = await nextInstance.get("/api/accounts/refresh");
      return data;
    } catch (err) {
      return err.response.data;
    }
  };

  const maxAge = 10000;
  const memoizedRefreshToken = mem(refreshToken, {
    maxAge,
  });

  // -------------------------------------------------------------------------------------------------
  // Load User
  // -------------------------------------------------------------------------------------------------

  const loadUser = async () => {
    const controller = new AbortController();
    try {
      if (token && token !== undefined) {
        const res = await privateInstance.get("/accounts/user/", {
          signal: controller.signal,
        });
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log(err.response.data);
    }
    setLoading(false);
    controller.abort();
  };
  useEffect(() => {
    loadUser();
  }, []);

  // -------------------------------------------------------------------------------------------------
  // LogIn User
  // -------------------------------------------------------------------------------------------------

  // const loginUser = async (e) => {
  //   e.preventDefault();
  //   const username = e.target.username.value;
  //   const password = e.target.password.value;
  //   const body = JSON.stringify({
  //     username,
  //     password,
  //   });
  //   const controller = new AbortController();
  //   try {
  //     const res = await nextInstance.post("/api/accounts/login", body, {
  //       signal: controller.signal,
  //     });
  //     token = Cookies.get("access");
  //     loadUser();
  //   } catch (err) {
  //     console.log(err.response.data);
  //   }
  //   controller.abort();
  // };

  const loginUser = async (uname, passwd) => {
    const username = uname;
    const password = passwd;
    const body = JSON.stringify({
      username,
      password,
    });

    const controller = new AbortController();

    try {
      const res = await nextInstance.post("/api/accounts/login", body, {
        signal: controller.signal,
      });
      token = Cookies.get("access");
      loadUser();
    } catch (err) {
      console.log(err.response.data);
    }

    controller.abort();
  };

  // -------------------------------------------------------------------------------------------------
  // LogOut User
  // -------------------------------------------------------------------------------------------------

  const logoutUser = async () => {
    const controller = new AbortController();
    try {
      const res = await nextInstance.post("/api/accounts/logout", {
        signal: controller.signal,
      });
      setUser(null);
    } catch (err) {
      return err.response.data;
    }
    controller.abort();
  };

  const value = {
    isAuthenticated: !!user,
    user,
    setUser,
    loading,
    setLoading,
    loginUser,
    logoutUser,
    privateInstance,
    publicInstance,
    nextInstance,
  };

  return (
    <AccountContext.Provider value={value}>
      {loading ? null : children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => useContext(AccountContext);
