export interface IAuthStoreData {
  user: IUser | null;
  token: string | null;
  isLogged: boolean;
  logIn: ({ user, token }: { user: IUser; token: string }) => void;
  loOut: () => void;
}

export interface IUser {
  full_name: string;
  username: string;
  role: string;
  user_id: string;
}

interface IAuthResponseTokens {
  accessToken: string;
  access_token_expire: string;
  refreshToken: string;
  refresh_token_expire: string;
}

export interface IAuthResponse {
  data: IAuthResponseTokens;
  message: string;
  status: number;
  user: IUser;
}
