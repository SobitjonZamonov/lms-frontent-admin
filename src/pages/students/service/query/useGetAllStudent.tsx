import { instance } from "../../../../config/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { IGetStudentInterface } from "../../../../utils/interface/getStudent.interface";


const useGetAllStudent = (
  page: number,
  limit: number,
  data_of_birth?: string,
  gender?: string,
  groupId?: string,
  fullname?: string
) => {
  return useQuery({
    queryKey: [
      "students",
      page,
      limit,
      data_of_birth,
      gender,
      groupId,
      fullname,
    ],
    queryFn: () =>
      instance
        .get<IGetStudentInterface>(`/students?page=${page}&limit=${limit}`, {
          params: { data_of_birth, gender, groupId, fullname },
        })
        .then((res) => res.data),
  });
};

export default useGetAllStudent;
