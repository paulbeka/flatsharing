import React from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import WelcomePage from './components/HomePageComponents/WelcomePage';
import HomePage from './components/HomePageComponents/HomePage';
import Login from './Login'
import { useEnvironmentsStore } from './store/EnvironmentsContext';


const App = () => {
  const environmentsStore = useEnvironmentsStore();

  return (
    <SafeAreaView style={styles.app}>
      {/* {environmentsStore.isEnvironments() ? <HomePage /> : <WelcomePage />} */}
      <Login />        
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
