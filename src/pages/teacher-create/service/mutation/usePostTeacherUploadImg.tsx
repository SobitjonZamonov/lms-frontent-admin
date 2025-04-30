import { instance } from "../../../../config/axios-instance";
import { useMutation } from "@tanstack/react-query";

export const usePostTeacherUploadImg = () => {
  return useMutation({
    mutationFn: (img: File) => {
      const formData = new FormData();
      formData.append("file", img);
      return instance
        .post("/teacher/upload-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
  });
};
