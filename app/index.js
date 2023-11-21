import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import { useEnvironmentsStore } from './store/EnvironmentsContext';
import firebase from 'firebase/compat/app';
import { observer  } from 'mobx-react';
import FirstView from './auth/FirstView';
import Login from './auth/Login'
import Register from './auth/Register'
import { useRouter } from 'expo-router';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const App = observer(() => {
  const environmentsStore = useEnvironmentsStore();
  const router = useRouter()
  
  const [user, setUser] = useState(null);
  const [initialView, setInitialView] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();


  useEffect(() => {
    environmentsStore.loadLanguage()
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
      if(authUser !== null) {
        environmentsStore.loadEnvironments()
      }
    });

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // do something when the notification is replied to or something
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => console.log(response)
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
      unsubscribe();
    };

  }, []);


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
        projectId: '91c6ab3f-1a23-4b6a-81b1-88975f88c6ed',
      });
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return token.data;
  }

  if(environmentsStore.language === null) {
    return null
  }

  if(user) {
    if(environmentsStore.environments === null) {
      return <Text>Loading...</Text>
    } else {
      router.replace("(home)/HomePage")
    }
  } else {
    return (
      initialView === null ? <FirstView setInitialView={setInitialView}/> : (
        initialView === "login" ? <Login setInitialView={setInitialView}/> : <Register setInitialView={setInitialView}/>
      )
    )
  }
});


export default App;