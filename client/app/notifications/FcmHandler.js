import messaging from '@react-native-firebase/messaging';
import { useTaskDatabaseHandler } from '../store/EnvironmentEventHandler';


export const handleFcmPermission = () => {
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('FCM Permission granted');
    }
  };

  requestUserPermission();

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    useTaskDatabaseHandler().uploadUserTokenId(token);
  };

  getToken();

  const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
    handleIncomingFcmDataMessage(remoteMessage);
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    handleIncomingFcmDataMessage(remoteMessage);
  });

  return () => {
    unsubscribeForeground();
  };
}


const handleIncomingFcmDataMessage = (payload) => {
  console.log('A new FCM message arrived!', JSON.stringify(payload));

} 