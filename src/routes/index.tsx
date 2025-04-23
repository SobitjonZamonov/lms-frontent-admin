import RoleChecker from "../components/RoleChecker";
import Login from "../pages/auth/login";
import Dashboard from "../pages/dashboard/dashboard";
import Students from "../pages/students/students";
import StudentAdd from "../pages/students/components/studentAdd";
import Teachers from "../pages/teachers/teachers";
import TeacherAdd from "../pages/teachers/components/addTeacher";

interface RouteT {
    path: string;
    element: React.ReactNode;
    children?: ChildrenT[]
}
interface ChildrenT {
    index?: boolean;
    path?: string;
    element: React.ReactNode
}
export const routes: RouteT[] = [
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    },
    {
        path: "/students",
        element: <Students />
    },
    {
        path: "/students/add",
        element: <StudentAdd />
    },
    {
        path: "/teachers",
        element: <Teachers />
    },
    {
        path: "/teachers/add",
        element: <TeacherAdd />
    },
    {
        path: "/",
        element: <RoleChecker roles={["admin", "teacher"]} />,
        children: [
            {
                index: true,
                element: <Dashboard />
            }
        ]
    }
]
