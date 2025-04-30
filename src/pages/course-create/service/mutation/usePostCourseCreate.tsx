import { instance } from "../../../../config/axios-instance";
import { useMutation } from "@tanstack/react-query";
interface ICourseCreate { 
    name: string,
    duration: number,
    description: string,
    status: string,
}
export const usePostCourseCreate = () => {
  return useMutation({
    mutationFn: (data:ICourseCreate) =>
      instance.post("/courses", data).then((res) => res.data),
  });
};
