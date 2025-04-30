// @ts-ignore
import MenuIcon1 from "../../../assets/svg/menu-icon-1.svg";
// @ts-ignore
import MenuIcon2 from "../../../assets/svg/menu-icon-2.svg";
// @ts-ignore
import MenuIcon3 from "../../../assets/svg/menu-icon-3.svg";
// @ts-ignore
import MenuIcon4 from "../../../assets/svg/menu-icon-4.svg";
// @ts-ignore
import MenuIcon5 from "../../../assets/svg/menu-icon-5.svg";
// @ts-ignore
import MenuIcon6 from "../../../assets/svg/menu-icon-6.svg";
// @ts-ignore
import MenuIcon7 from "../../../assets/svg/menu-icon-7.svg";
import { Link } from "react-router-dom";

export const menu = [
  {
    key: "1",
    icon: <img src={MenuIcon1} width={24} height={24} alt="Asosiy" />,
    label: <Link to="/">Asosiy</Link>,
  },
  {
    key: "2",
    icon: <img src={MenuIcon2} width={24} height={24} alt="O’quvchilar" />,
    label: <Link to="/students">O’quvchilar</Link>,
  },
  {
    key: "3",
    icon: <img src={MenuIcon3} width={24} height={24} alt="O’qituvchilar" />,
    label: <Link to="/teachers">O’qituvchilar</Link>,
  },
  {
    key: "4",
    icon: <img src={MenuIcon4} width={24} height={24} alt="Guruhlar" />,
    label: <Link to="/groups">Guruhlar</Link>,
  },
  {
    key: "5",
    icon: <img src={MenuIcon4} width={24} height={24} alt="Kurslar" />,
    label: <Link to="/courses">Kurslar</Link>,
  },
];

export const menuBootm = [
  {
    key: "6",
    icon: <img src={MenuIcon6} width={24} height={24} alt="Sozlamalar" />,
    label: <Link to="/settings">Sozlamalar</Link>,
  },
];

export const SelectedKeys: Record<string, number> = {
  "": 1,
  students: 2,
  teachers: 3,
  groups: 4,
  course: 5,
  settings: 0,
};
