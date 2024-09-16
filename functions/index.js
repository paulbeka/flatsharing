const {onValueUpdated} = require("firebase-functions/v2/database");
const admin = require("firebase-admin");


admin.initializeApp();


exports.scheduleLocalNotificationOnTaskComplete = onValueUpdated({
  ref: "/environments/{envId}/tasks/{taskId}",
  region: "europe-west1",
}, async (event) => {
  const {environmentId, taskId} = event.params;
  const task = event.data.val();

  const payload = {
    data: {
      hello: "world",
      environmentId: environmentId,
      taskId: taskId,
      task: task,
    },
    token: "null",
  };

  admin.messaging().send(payload);
});

