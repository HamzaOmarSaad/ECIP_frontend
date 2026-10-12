import { useCallback, useMemo, useState, type ReactNode } from "react";
import { userContext, type UserDataType } from "./contextCreation";

function UserContextProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserDataType | null>(null);

  const getUserData = useCallback(async (token: string) => {
    try {
      const response = await fetch(`http://localhost:3000/user/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      const profile = data?.data ?? data;
      setUserData(profile ?? null);
    } catch (error) {
      console.log("🚀 ~ getUserData ~ error:", error);
      setUserData(null);
    }
  }, []);

  const value = useMemo(
    () => ({ userData, getUserData }),
    [getUserData, userData],
  );

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}

export default UserContextProvider;
