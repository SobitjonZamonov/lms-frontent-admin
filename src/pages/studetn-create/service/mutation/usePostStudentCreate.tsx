import { instance } from "../../../../config/axios-instance";
import { useMutation } from "@tanstack/react-query";
interface ICreateStudentParams {
  img_url?: string;
  full_name: string;
  username: string;
  password: string;
  gender: string;
  address: string;
  groupId: string;
  paymentType: string;
  sum: number;
  phone_number: string;
  data_of_birth: string;
}

export const usePostCreateStudent = () => {
  return useMutation({
    mutationFn: (studentData: ICreateStudentParams) =>
      instance.post("/students", studentData),
  });
};
