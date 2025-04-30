import { instance } from "../../../../config/axios-instance";
import { useMutation } from "@tanstack/react-query";

interface IGoupCreateParams {
  name: string;
  course_id: string;
  teacher_id?: string;
  start_date: string;
  description?: string;
  status?: string;
}

export const usePostGroupCreate = () => {
  return useMutation({
    mutationFn: (groupData: IGoupCreateParams) =>
      instance.post("/groups", groupData),
  });
};
