import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import WelcomePage from './components/HomePageComponents/WelcomePage';
import HomePage from './components/HomePageComponents/HomePage';
import Login from './Login';
import { useEnvironmentsStore } from './store/EnvironmentsContext';
import firebase from 'firebase/compat/app';

const App = () => {
  const environmentsStore = useEnvironmentsStore();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.app}>
      {user ? (
        environmentsStore.isEnvironments() ? <HomePage /> : <WelcomePage />
      ) : (
        <Login />
      )}
    </SafeAreaView>
  );
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
