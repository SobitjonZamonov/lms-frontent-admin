import { instance } from "../../../../config/axios-instance";
import { useMutation } from "@tanstack/react-query";

interface ICreateStudentParams {
  img_url?: string;
  full_name: string;
  username: string;
  password: string;
  gender: string;
  address: string;
  phone_number: string;
  data_of_birth: string;
}
export const usePostTeacherCreate = () => {
  return useMutation({
    mutationFn: (studentData: ICreateStudentParams) =>
      instance
        .post("/teacher/createTeacher", studentData)
        .then((res) => res.data),
  });
};
