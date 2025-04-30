import { create } from "zustand";
// import { IAuthStoreData, IUser } from "@/utils/index";
import { IAuthStoreData, IUser } from "../utils";
import Cookie from "js-cookie";

export const useAuthStore = create<IAuthStoreData>()((set) => ({
  user: Cookie.get("user") ? JSON.parse(Cookie.get("user") as string) : null,
  token: null,
  isLogged: !!Cookie.get("accessToken"),
  logIn: ({ user, token }: { user: IUser; token: string }) => {
    Cookie.set("user", JSON.stringify(user), { expires: 1 / 24 });
    Cookie.set("accessToken", token, { expires: 1 / 24 });
    set({ user, token, isLogged: true });
  },
  loOut() {
    Cookie.remove("user");
    Cookie.remove("accessToken");
    set({ user: null, token: null, isLogged: false });
  },
}));