import { IImages } from "./getDashboard.interface";

export interface IGetStudentInterface {
  status: number;
  message: string;
  data: IStudetn[];
  meta: IMeta;
}

export interface IMeta {
  studentCount: number;
}

export interface IStudetn {
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
  group_members: IGroupMember[];
  PaymentForStudent: IPaymentForStudent[];
}

export interface IGroupMember {
  group_members_id: string;
  group_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  group: IGroup;
}

export interface IGroup {
  group_id: string;
  name: string;
  description: string;
  course_id: string;
  teacher_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface IPaymentForStudent {
  type: string;
  sum: number;
}
