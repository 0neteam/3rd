// 알림 요청 및 띄우기 함수

export const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      console.error("이 브라우저는 알림을 지원하지 않습니다.");
      return;
    }
  
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("알림 허용됨 ✅");
    } else {
      console.log("알림 거부됨 ❌");
    }
  };
  
  export const showBrowserNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    }
  };
  