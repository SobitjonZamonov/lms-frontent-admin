import { IImages } from "./getDashboard.interface";

export interface IGetTeachersInterface {
  status: number;
  message: string;
  data: ITeacher[];
  meta: IMeta;
}

export interface ITeacher {
  full_name: string;
  username: string;
  password: string;
  role: string;
  address: string;
  phone_number: string;
  gender: string;
  data_of_birth: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  images: IImages[];
}

export interface IMeta {
  teacherCount: number;
}
