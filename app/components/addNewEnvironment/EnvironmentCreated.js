import React from "react";
import { 
  SafeAreaView, Text, View, Pressable
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';


const EnvironmentCreated = () => {
  const router = useRouter()

  const goToTasksManagement = () => {

  }

  const goHome = () => {
    router.replace('/')
  }

  return (
    <SafeAreaView style={styles.environmentCreatedPage}>
      <View style={styles.checkmarkView}>
        <Ionicons name="checkmark-circle-outline" size={128} color="green" style={styles.checkmark} />
        <Text style={styles.createdEnvironmentText}>
          You have created a new environment! Head back to the home page to see your environment,
          or click on the add tasks button to add tasks to the environment.
        </Text>
      </View>
      

      <View style={styles.buttonsView}>
        <Pressable style={styles.button} onPress={goToTasksManagement}>
          <Text style={styles.buttonText}>Edit Tasks</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={goHome}>
          <Text style={styles.buttonText}>Home</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = {
  environmentCreatedPage: {
    flex: 1,
    backgroundColor: '#bdf8ff',
    alignItems: 'center',
  },
  checkmark: {
    marginBottom: 10
  },
  buttonsView: {
    marginBottom: 20,
    width: '90%',
    alignItems: 'center'
  },
  checkmarkView: {
    flex: 1,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 15,
    width: '90%',
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createdEnvironmentText: {
    fontWeight: 'bold'
  }
}

export default EnvironmentCreated