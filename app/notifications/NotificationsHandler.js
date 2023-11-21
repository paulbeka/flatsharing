import * as Notifications from "expo-notifications";


// TODO: check that the same thing hasn't been scheduled already
// When loading the data from server, check what has already been scheduled
// and when. If it has been scheduled, but now it's at a different time,
// then cancel the schedule and re-schedule.
// How will I persist which have been scheduled?
export async function scheduleNotification(content) {

  Notifications.getAllScheduledNotificationsAsync().then((notifList) => {
    console.log(notifList)
    notifList.map((notif) => {
      let taskName = notif.content.body.split(":")[1];
      taskName = taskName.substring(1, taskName.length);
      // check that the task is being triggered at the same time
      // check data === time and the value assosiated
      if(taskName === content.title) {
        console.log("Task has already been scheduled at this time!")
      }
    })
  })

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
