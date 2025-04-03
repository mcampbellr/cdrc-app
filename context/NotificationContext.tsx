import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import * as Notifications from "expo-notifications";
import { EventSubscription } from "expo-modules-core";
import { registerPushNotificationsAsync } from "@/utils/registerPushNotifications";

interface NotificationContextType {
  expoPushToken: string | null;
  notification: Notifications.Notification | null;
  error: Error | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }

  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const notificationListener = useRef<EventSubscription>();
  const responseListener = useRef<EventSubscription>();

  useEffect(() => {
    registerPushNotificationsAsync()
      .then((token) => setExpoPushToken(token))
      .catch((error) => setError(error));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // custom login if the app is open while you get it
        console.log(
          "🔔 Notification Received: ",
          notification.request.content.data,
        );
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;
        if (data["android.intent.extra.REFERRER"]) {
          return;
        }
        console.log(
          "🔔 Notification Response: ",
          JSON.stringify(response.notification.request.content.data, null, 2),
        );
        // Handle the notification response here
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{ expoPushToken, notification, error }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
