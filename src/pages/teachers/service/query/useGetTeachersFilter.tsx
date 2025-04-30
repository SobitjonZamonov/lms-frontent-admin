import { instance } from "../../../../config/axios-instance";
import { IGetTeachersInterface } from "../../../../utils/interface/getTeachers.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetTeachers = (
  page: number,
  limit: number,
  date_of_birth: string | undefined,
  gender: string | undefined,
  full_name: string | undefined
) => {
  return useQuery({
    queryKey: ["teachers", page, limit, date_of_birth, gender, full_name],
    queryFn: () =>
      instance
        .get<IGetTeachersInterface>(`/teacher?page=${page}&limit=${limit}`, {
          params: { date_of_birth, gender, full_name },
        })
        .then((res) => res.data),
  });
};
