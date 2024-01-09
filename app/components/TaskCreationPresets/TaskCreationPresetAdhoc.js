import React from "react";
import {
  View, Text, StyleSheet
} from 'react-native';
import { useEnvironmentsStore } from "../../store/EnvironmentsContext";


const TaskCreationPresetAdhoc = (task) => {
  const environmentsStore = useEnvironmentsStore();
  const environment = environmentsStore.getEnvironment()

  const createTask = () => {

  }

  // This should contain a brief explanation of what's going on, and settings for 
  // the number of times it happens and who is involved.
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.modalTitle}>Ad Hoc</Text>
      <Text>{task.task.description}</Text>
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
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 28,
    marginTop: 15,
    fontWeight: 'bold'
  }
});
export default TaskCreationPresetAdhoc