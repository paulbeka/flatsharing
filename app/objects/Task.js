import { scheduleNotification } from "../notifications/NotificationsHandler";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const Task = (tname, tdescription, ttype, tflatmates, ticon, ttiming) => {
  const name = tname;
  const description = tdescription;
  const type = ttype;
  const flatmates = tflatmates;
  const icon = ticon;
  const timingInDays = ttiming
  let next = null

  if(type === 1) {
    next = flatmates[0]
  } else {
    const dayInMillis = 24 * 60 * 60 * 1000
    const trigger = new Date(Date.now() + (dayInMillis * timingInDays));
    trigger.setHours(8); // trigger at 8am every day
    trigger.setMinutes(0);
    trigger.setSeconds(0);

    scheduleNotification({
      title: "You have a task to do!",
      body: `Task to do: ${name}`,
      time: trigger
    }).then(async (notifId) => {
      try {
        await AsyncStorage.setItem(name, notifId);
      } catch (e) {
        console.log(e);
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  
  return {
    name, description, type, flatmates, icon, timingInDays, next
  }
}

