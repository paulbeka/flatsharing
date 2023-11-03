import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
} from 'react-native';
import WelcomePage from './components/HomePageComponents/WelcomePage';
import HomePage from './components/HomePageComponents/HomePage';
import Login from './Login';
import { useEnvironmentsStore } from './store/EnvironmentsContext';
import firebase from 'firebase/compat/app';
import { useObserver } from 'mobx-react';

const App = () => {
  const environmentsStore = useEnvironmentsStore();
  
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
      if(authUser !== null) {
        environmentsStore.loadEnvironments()
      }
    });

    return () => unsubscribe();
  }, []);


  return useObserver(() => (
    <SafeAreaView style={styles.app}>
      {user ? (environmentsStore.environments[0] === null ? (
        <Text>Loading...</Text>
      ) : (environmentsStore.environments.length > 0 ? <HomePage /> : <WelcomePage />)
      ) : (
        <Login />
      )}
    </SafeAreaView>
  ));
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#bdf8ff',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});

export default App;
