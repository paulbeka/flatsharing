import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
} from 'react-native';
import WelcomePage from './components/HomePageComponents/WelcomePage';
import HomePage from './components/HomePageComponents/HomePage';
import { useEnvironmentsStore } from './store/EnvironmentsContext';
import firebase from 'firebase/compat/app';
import { observer  } from 'mobx-react';
import FirstView from './FirstView';
import Login from './auth/Login'


const App = observer(() => {
  const environmentsStore = useEnvironmentsStore();
  
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

  return (
    <SafeAreaView style={styles.app}>
      {user ? (environmentsStore.environments[0] === null ? (
        <Text>Loading...</Text>
      ) : (environmentsStore.environments.length > 0 ? <HomePage /> : <WelcomePage />)
      ) : (
        initialView === null ? <FirstView setInitialView={setInitialView}/> : (
          initialView === "login" ? <Login setInitialView={setInitialView}/> : <Register setInitialView={setInitialView}/>
        )
      )}
    </SafeAreaView>
  );
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
