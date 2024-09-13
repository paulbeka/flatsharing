
const dayInMillis =  24 * 60 * 60 * 1000;

export const Task = (tname, tdescription, ttype, tflatmates, ticon, ttiming) => {
  const name = tname;
  const description = tdescription;
  const type = ttype;
  const flatmates = tflatmates;
  const icon = ticon;
  const timingInDays = ttiming;
  const dateOfCreation = Date.now();
  let dateLastCompleted = Date.now();
  let next = flatmates[0];

  if(type === 0) {
    const dayInMillis = 24 * 60 * 60 * 1000
    const trigger = new Date(Date.now() + (dayInMillis * timingInDays));
    trigger.setHours(8); // trigger at 8am every day
    trigger.setMinutes(0);
    trigger.setSeconds(0);

    // todo: extract the scheduleNotification function inside of a producer
    // scheduleNotification({
    //   title: "You have a task to do!",
    //   body: `Task to do: ${name}`,
    //   time: trigger
    // }).then(async (notifId) => {
    //   try {
    //     await AsyncStorage.setItem(name, notifId);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }).catch((err) => {
    //   console.log(err);
    // })
  }
  
  return {
    name,
    description,
    type,
    flatmates,
    icon,
    timingInDays,
    next,
    dateOfCreation,
    dateLastCompleted
  };
}

export const daysBeforeTaskDue = (task, username) => {
  const currentTime = Date.now();

  const flatmates = task.flatmates;

  const usernameIndex = flatmates.indexOf(username);
  const nextIndex = flatmates.indexOf(task.next);

  const forwardDistance = (nextIndex - usernameIndex + flatmates.length) % flatmates.length;
  const backwardDistance = (usernameIndex - nextIndex + flatmates.length) % flatmates.length;
  const distance = Math.min(forwardDistance, backwardDistance) + 1;

  const timeDiff = (task.dateLastCompleted + (task.timingInDays * distance * dayInMillis)) - currentTime;
  const daysDiff = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
  return daysDiff > 0 ? daysDiff : 0;
}

export const getGetDoneByDate = (task) => {
  const getDoneByTime = (task.dateLastCompleted + (task.timingInDays * dayInMillis))
  return new Date(getDoneByTime);
}

export const setTaskCompletedToday = (task) => {
  const date = Date.now();
  task.dateLastCompleted = date;
  return task;
}