import React from "react";
import { 
  SafeAreaView, Text, View, Pressable
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';


const EnvironmentCreated = () => {
  const router = useRouter()

  const goToTasksManagement = () => {
    router.replace('/(home)/ListOfTasks')
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

        <Pressable style={styles.button} onPress={goToTasksManagement}>
          <Text style={{...styles.buttonText, color: "white"}}>Add tasks now</Text>
        </Pressable>
        <Pressable style={{...styles.button, backgroundColor: "#DEDEDE"}} onPress={goHome}>
          <Text style={{...styles.buttonText, color: "black"}}>Home</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = {
  environmentCreatedPage: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  checkmark: {
    marginBottom: 10
  },
  checkmarkView: {
    flex: 1,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 25,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: {
    fontSize: 16,
  },
  createdEnvironmentText: {
    fontWeight: 'bold',
    marginBottom: 25
  }
}

export default EnvironmentCreated