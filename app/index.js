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
import { useObserver } from 'mobx-react';
import FirstView from './FirstView';
import TaskCreationPage from './TaskCreationPage';


const App = () => {
  const environmentsStore = useEnvironmentsStore();
  
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      console.log(authUser)
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
        // <FirstView />
        <TaskCreationPage />
      )}
    </SafeAreaView>
  ));
};

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
