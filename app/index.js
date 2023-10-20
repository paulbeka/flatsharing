import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Pressable,
} from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import { SIZES } from '../constants/themes.js';

const App = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.app}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Welcome to the flatmates sharing app!</Text>
          <Link href="/NewEnvironmentPage" asChild>
            <Pressable style={styles.newEnvironmentButton}>
              <Text style={styles.buttonText}>Create New Environment</Text>
            </Pressable>
          </Link>
        </View>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.medium,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
  newEnvironmentButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: 'lightblue',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
