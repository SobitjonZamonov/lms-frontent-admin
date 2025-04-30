import { instance } from "../../../../config/axios-instance";
import { IGetCourseInterface } from "../../../../utils/interface/getCourser.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetCourseAll = () => {
  return useQuery({
    queryKey: ["course_all"],
    queryFn: () =>
      instance.get<IGetCourseInterface>(`/courses/all`).then((res) => res.data),
  });
};
