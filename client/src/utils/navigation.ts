import { Book, LogInIcon, User } from "lucide-react";

export const publicNavItems = [
  {
    Icon: LogInIcon,
    to: "/login",
    label: "login",
  },
  {
    Icon: User,
    to: "/register",
    label: "register",
  },
];

export const loggedUserNavItems = [
  {
    Icon: Book,
    to: "/todos",
    label: "all todos",
  },
];
