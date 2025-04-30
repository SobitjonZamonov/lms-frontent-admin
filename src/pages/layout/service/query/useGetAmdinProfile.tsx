import { instance } from "../../../../config/axios-instance";
import { IGetProfile } from "../../../../utils/interface/getProfile.interface copy";
import { useQuery } from "@tanstack/react-query";

export const useGetAmdinProfile = () => {
  return useQuery({
    queryKey: ["admin_profile"],
    queryFn: () => instance.get<IGetProfile>("admin/getProfile").then((res) => res.data),
  });
};
