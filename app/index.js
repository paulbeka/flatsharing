// import React, { useState, useEffect, useRef } from 'react';
// import {
//   StyleSheet,
//   Text,
// } from 'react-native';
// import { useEnvironmentsStore } from './store/EnvironmentsContext';
// import firebase from 'firebase/compat/app';
// import { observer  } from 'mobx-react';
// import FirstView from './auth/FirstView';
// import Login from './auth/Login'
// import Register from './auth/Register'
// import { useRouter } from 'expo-router';
// import * as Notifications from 'expo-notifications';
// import * as Device from 'expo-device';
// import Constants from 'expo-constants';


// const App = observer(() => {
//   const environmentsStore = useEnvironmentsStore();
//   const router = useRouter()
  
//   const [user, setUser] = useState(null);
//   const [initialView, setInitialView] = useState(null);
//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef()

//   useEffect(() => {
//     environmentsStore.loadLanguage()
//     const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
//       setUser(authUser);
//       if(authUser !== null) {
//         environmentsStore.loadEnvironments()
//       }
//     });

//     // register for notifications
//     registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
//     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//       setNotification(notification);
//     });
//     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//       console.log(response);
//     });

//     return () => unsubscribe();
//   }, []);

//   if(environmentsStore.language === null) {
//     return null
//   }

//   if(user) {
//     if(environmentsStore.environments === null) {
//       return <Text>Loading...</Text>
//     } else {
//       router.replace("(home)/HomePage")
//     }
//   } else {
//     return (
//       initialView === null ? <FirstView setInitialView={setInitialView}/> : (
//         initialView === "login" ? <Login setInitialView={setInitialView}/> : <Register setInitialView={setInitialView}/>
//       )
//     )
//   }
// });

// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync({ 
//       projectId: Constants.expoConfig.extra.eas.projectId
//     })).data;
//     console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   return token;
// }

// const styles = StyleSheet.create({
//   app: {
//     flex: 1,
//     backgroundColor: '#F6F8FA',
//   },
//   scrollViewContent: {
//     flexGrow: 1,
//     justifyContent: 'space-between',
//   },
// });

// export default App;

import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: 'b0c6eaad-05b1-44ef-9402-6fc6c63b23ef',
    });
    console.log(token)
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token.data;
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
    </View>
  );
}
