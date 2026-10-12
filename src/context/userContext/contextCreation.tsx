import { createContext } from "react";

export type UserDataType = {
  id: string;
  email: string;
  name: string;
  role: string;
};

type UserContextType = {
  userData: UserDataType | null;
  getUserData: (token: string) => Promise<void>;
};

export const userContext = createContext<UserContextType>({
  userData: null,
  getUserData: async () => {},
});
