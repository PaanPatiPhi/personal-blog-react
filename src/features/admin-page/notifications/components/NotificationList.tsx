import NotificationItem from "./NotificationItem";
import type { Notification } from "../notification.types";

interface Props {
  notifications: Notification[];
}

export default function NotificationList({ notifications }: Props) {
  return (
    <ul>
      {notifications.map((item, index) => (
        <NotificationItem
          key={item.id}
          notification={item}
          isLast={index === notifications.length - 1}
        />
      ))}
    </ul>
  );
}
