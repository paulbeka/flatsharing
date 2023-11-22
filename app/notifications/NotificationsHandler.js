import * as Notifications from "expo-notifications";


// TODO: check that the same thing hasn't been scheduled already
// When loading the data from server, check what has already been scheduled
// and when. If it has been scheduled, but now it's at a different time,
// then cancel the schedule and re-schedule.
// How will I persist which have been scheduled?
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

export async function cancelNotification(notifId) {
  await Notifications.cancelScheduledNotificationAsync(notifId);
}
