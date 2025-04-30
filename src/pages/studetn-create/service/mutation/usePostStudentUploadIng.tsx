import { instance } from "../../../../config/axios-instance";
import { useMutation } from "@tanstack/react-query";

export const useUploadImgStudent = () => {
  return useMutation({
    mutationFn: (img: File) => {
      const formData = new FormData();
      formData.append("file", img);
      return instance
        .post("/students/upload-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
  });
};
