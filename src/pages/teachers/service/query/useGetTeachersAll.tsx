import { instance } from "../../../../config/axios-instance";
import { IGetTeachersInterface } from "../../../../utils/interface/getTeachers.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetTeachersAll = () => {
  return useQuery({
    queryKey: ["teachers_all"],
    queryFn: () =>
      instance
        .get<IGetTeachersInterface>(`/teacher/for-group`)
        .then((res) => res.data),
  });
};
