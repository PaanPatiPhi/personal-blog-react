import articleIcon from "../../../assets/icon/admin-page/notebook_light.png"
import categoryIcon from "../../../assets/icon/admin-page/File_light.png"
import profileIcon from "../../../assets/icon/admin-page/User_duotone.png"
import notificationIcon from "../../../assets/icon/admin-page/Bell_light.png"


export const adminMenu = [
  {
    to: "/admin/articles",
    label: "Article management",
    icon: articleIcon,
  },
  {
    to: "/admin/categories",
    label: "Category management",
    icon: categoryIcon,
  },
  {
    to: "/admin/profile",
    label: "Profile",
    icon: profileIcon,
  },
  {
    to: "/admin/notification",
    label: "Notification",
    icon: notificationIcon,
  },
  {
    to: "/admin/reset-password",
    label: "Reset Password",
    icon: notificationIcon,
  },
];
