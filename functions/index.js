const { onValueUpdated } = require("firebase-functions/v2/database");
const admin = require('firebase-admin');


admin.initializeApp(functions.config().firebase);


exports.scheduleLocalNotificationOnTaskComplete = onValueUpdated(
  "/environments/{envId}/tasks/{taskId}", 
  (event) => {
    
  const { environmentId, taskId } = event.params;
  const task = event.data.val();
  
  const payload = {

  };
    
});

