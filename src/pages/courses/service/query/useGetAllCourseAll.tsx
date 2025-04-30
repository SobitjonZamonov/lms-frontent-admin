import { instance } from "../../../../config/axios-instance";
import { IGetCourseInterface } from "../../../../utils/interface/getCourser.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetCourse = (
  page: number,
  limit: number,
  status: string | undefined,
  name: string | undefined
) => {
  return useQuery({
    queryKey: ["course", page, limit, status, name],
    queryFn: () =>
      instance
        .get<IGetCourseInterface>(`/courses?page=${page}&limit=${limit}`, {
          params: { status, name },
        })
        .then((res) => res.data),
  });
};
