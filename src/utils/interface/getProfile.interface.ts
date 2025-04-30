import { IImages } from "./getDashboard.interface";

export interface IGetProfile {
  status: number;
  message: string;
  data: IUserProfile;
}

export interface IUserProfile {
  user_id: string;
  full_name: string;
  username: string;
  role: string;
  images: IImages[];
}
