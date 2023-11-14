import React, { useState, useEffect } from 'react';
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


const App = observer(() => {
  const environmentsStore = useEnvironmentsStore();
  const router = useRouter()
  
  const [user, setUser] = useState(null);
  const [initialView, setInitialView] = useState(null);
  
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
      if(authUser !== null) {
        environmentsStore.loadEnvironments()
      }
    });

    return () => unsubscribe();
  }, []);

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

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#F6F8FA',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});

export default App;
