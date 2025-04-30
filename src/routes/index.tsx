import { lazy } from "react";
import RoleChecker from "../components/RoleChecker";
import Dashboard from "../pages/dashboard/dashboard";
import { IRoutes } from "../utils";
const AdminLayout = lazy(() => import("../pages/layout/AdminLayout"))
import Teachers from "../pages/teachers/teachers";
import Groups from "../pages/groups/groups";
import Settings from "../pages/settings/settings";
import StudentCreate from "../pages/studetn-create/student-create";
import TeacherCreate from "../pages/teacher-create/teacher-create";
import GroupCreate from "../pages/group-create/group-create";
import StudentDiteil from "../pages/students/components/student-diteil";
import TeacherDiteil from "../pages/teachers/components/teacher-diteil";
import GroupDiteil from "../pages/groups/components/group-diteil";
import Courses from "../pages/courses/course";
import CourseCreate from "../pages/course-create/course-create";
import CourseDiteil from "../pages/courses/components/course-diteil";
import Login from "../pages/auth/login";
import Students from "../pages/students/students";
import AdminProfile from "../pages/layout/components/profile";

export const routes: IRoutes[] = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <RoleChecker roles={["ADMIN"]} />,
      children: {
        index: true,
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "/students",
            element: <Students />
          },
          {
            path: "/teachers",
            element: <Teachers />,
          },
          {
            path: "/groups",
            element: <Groups />,
          },
          {
            path: "/courses",
            element: <Courses />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
          {
            path: "/student/create",
            element: <StudentCreate />,
          },
          {
            path: "/teacher/create",
            element: <TeacherCreate />,
          },
          {
            path: "/group/create",
            element: <GroupCreate />,
          },
          {
            path: "/course/create",
            element: <CourseCreate />,
          },
          {
            path: "/student/:id",
            element: <StudentDiteil />,
          },
          {
            path: "/teacher/:id",
            element: <TeacherDiteil />,
          },
          {
            path: "/group/:id",
            element: <GroupDiteil />,
          },
          {
            path: "/course/:id",
            element: <CourseDiteil />,
          },
          {
            path: "/profile",
            element: <AdminProfile />
          }
        ],
      },
    },
    {
      path: "/",
      element: <RoleChecker roles={["TEACHER"]} />,
      children: {
        index: true,
        element: <></>,
      },
    },
  ];
  