import React from "react";
import {
  View, StyleSheet, Text
} from 'react-native';
import { useEnvironmentsStore } from "../../store/EnvironmentsContext";


const TaskCreationPresetPeriodic = (task) => {
  const environmentsStore = useEnvironmentsStore();
  const environment = environmentsStore.getEnvironment()

  const createTask = () => {

  }

  // This should contain a brief explanation of what's going on, and settings for 
  // the number of times it happens and who is involved.
  return (
    <View style={styles.mainContainer}>
      <Text>Periodic Preset</Text>
      <Text>Explaination of what this is...</Text>
      <Text>Select how often the task happens</Text>
      <Text>Select who is involved inside of this task</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    backgroundColor: '#cdd1d4',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default TaskCreationPresetPeriodic