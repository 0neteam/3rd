// 📁 services/notificationHelper.js

// 브라우저 알림 권한 요청
export const requestNotificationPermission = () => {
  if (!("Notification" in window)) return;

  if (Notification.permission !== "granted") {
    Notification.requestPermission().then((permission) => {
      console.log("🧾 알림 권한:", permission);
    });
  }
};

// 브라우저 알림 표시
export const showBrowserNotification = (title, message, icon = "/logo192.png") => {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, {
      body: message,
      icon,
    });
  }
};
