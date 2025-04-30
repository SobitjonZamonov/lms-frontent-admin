export interface IGetCourseInterface {
  status: number;
  message: string;
  data: ICourse[];
  meta: IMeta;
}
export interface ICourse {
  course_id: string;
  name: string;
  description: string;
  duration: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface IMeta {
    total: number;
}
