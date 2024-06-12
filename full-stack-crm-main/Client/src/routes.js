
import { Icon } from "@chakra-ui/react";
import { HiUsers } from "react-icons/hi";
import {
  MdContacts,
  MdHome,
  MdInsertChartOutlined,
  MdLeaderboard,
  MdLock
} from "react-icons/md";
// icon
import React from "react";
import { AiFillFolderOpen, AiOutlineMail } from "react-icons/ai";
import { FaCalendarAlt, FaRupeeSign, FaTasks } from "react-icons/fa";
import { LuBuilding2 } from "react-icons/lu";
import { PiPhoneCallBold } from "react-icons/pi";
import { SiGooglemeet } from "react-icons/si";

// Admin Imports
const MainDashboard = React.lazy(() => import("views/admin/default"));
const UserDashboard = React.lazy(() => import("views/admin/default"));

// My component
const Contact = React.lazy(() => import('views/admin/contact'));
const ContactView = React.lazy(() => import('views/admin/contact/View'));

const User = React.lazy(() => import("views/admin/users"));
const UserView = React.lazy(() => import("views/admin/users/View"));

const Lead = React.lazy(() => import("views/admin/lead"));
const LeadView = React.lazy(() => import("views/admin/lead/View"));

// const Communication = React.lazy(() => import("views/admin/communication"));

const Task = React.lazy(() => import("views/admin/task"));
const TaskView = React.lazy(() => import("views/admin/task/components/taskView"));


const Document = React.lazy(() => import("views/admin/document"));

const EmailHistory = React.lazy(() => import("views/admin/emailHistory"));
const EmailHistoryView = React.lazy(() => import("views/admin/emailHistory/View"));


// Auth Imports
const SignInCentered = React.lazy(() => import("views/auth/signIn"));

const routes = [
  // ========================== Dashboard ==========================
  // {
  //   name: "Dashboard",
  //   layout: "/admin",
  //   path: "/default",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: MainDashboard,
  // },
  // {
  //   name: "Dashboard",
  //   layout: "/user",
  //   path: "/default",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: UserDashboard,
  // },

  // {
  //   name: "Leads View",
  //   layout: "/admin",
  //   both: true,
  //   under: "lead",
  //   path: "/leadView/:id",
  //   component: LeadView,
  // },
  // --------------- contact Routes --------------------
  {
    name: "Users",
    layout: "/admin",
    both: true,
    path: "/default",
    icon: <Icon as={MdContacts} width='20px' height='20px' color='inherit' />,
    component: Contact,
  },
  {
    name: "Contact View",
    layout: "/admin",
    both: true,
    under: "default",
    path: "/default/:id",
    component: ContactView,
  },
  {
    name: " Campaign",
    layout: "/admin",
    both: true,
    path: "/campaign",
    icon: <Icon as={FaTasks} width='20px' height='20px' color='inherit' />,
    component: Task,
  },
  {
    name: "Campaign View",
    layout: "/admin",
    both: true,
    under: "campaign",
    path: "/campaign/:id",
    component: TaskView,
  },


  {
    name: "Users",
    layout: "/admin",
    path: "/user",
    icon: <Icon as={HiUsers} width='20px' height='20px' color='inherit' />,
    component: User,
  },
  {
    name: "User View",
    both: true,
    layout: "/admin",
    under: "user",
    path: "/userView/:id",
    component: UserView,
  },

  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
];

export default routes;
