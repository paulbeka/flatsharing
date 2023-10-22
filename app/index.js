import React from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import WelcomePage from './WelcomePage';
import HomePage from './HomePage';
import { EnvironmentsProvider, useEnvironmentsStore } from './store/EnvironmentsContext';

const App = () => {
  return (
    <EnvironmentsProvider>
      <AppContent />
    </EnvironmentsProvider>
  );
};

const AppContent = () => {
  const environmentsStore = useEnvironmentsStore();

  return (
    <SafeAreaView style={styles.app}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {environmentsStore.isEnvironments() ? <HomePage /> : <WelcomePage />}
      </ScrollView>
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
