import * as Notifications from "expo-notifications";


export async function scheduleNotification(content) {
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: content.title,
      body: content.body,
    },
    trigger: content.time,
  });
  return id;
}

export async function cancelNotification(id) {
  await Notifications.cancelScheduledNotificationAsync(notifId);
}
