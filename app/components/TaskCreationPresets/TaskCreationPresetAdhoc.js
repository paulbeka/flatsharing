import React from "react";
import {
  View, Text, StyleSheet
} from 'react-native';
import { useEnvironmentsStore } from "../../store/EnvironmentsContext";


const TaskCreationPresetAdhoc = (task) => {
  const environmentStore = useEnvironmentsStore();
  const environment = environmentStore.getEnvironment();

  const createTask = () => {

  }

  return (
    <View>
      <Text>Ad Hoc preset here</Text>
      <Text>Explain what this is about...</Text>
      <Text>Select who is involved here</Text>
    </View>
  )
}

const styles = StyleSheet.create({});

export default TaskCreationPresetAdhoc