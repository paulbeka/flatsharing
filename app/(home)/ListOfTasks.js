import React, { useState } from "react";
import { useEnvironmentsStore } from "../store/EnvironmentsContext";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useFonts, Quicksand_500Medium, Quicksand_700Bold } from '@expo-google-fonts/quicksand'; // Import the fonts
import Icon from "react-native-vector-icons/AntDesign";
import { useTaskDatabaseHandler } from '../store/EnvironmentEventHandler';
import ConfirmDeleteTaskModal from "../components/ListOfTasksComponents/ConfirmDeleteTaskModal";


const ListOfTasks = () => {
  const environmentsStore = useEnvironmentsStore();
  const deleteTaskOnDatabase = useTaskDatabaseHandler().deleteTaskOnDatabase;
  let environment = environmentsStore.getEnvironment(0);
  
  const [tasks, setTasks] = useState(environment.tasks)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [taskBeingDeleted, setTaskBeingDeleted] = useState(null);

  const [fontsLoaded] = useFonts({
    Regular: Quicksand_500Medium, 
    Bold: Quicksand_700Bold
  })

  const closeModal = () => {
    setIsModalVisible(false);
    setTaskBeingDeleted(null);
  }

  const deleteItem = (task) =>{
    setTaskBeingDeleted(task);
    setIsModalVisible(true);
  }

  const deleteTask = () => {
    deleteTaskOnDatabase(taskBeingDeleted);
    environment = environmentsStore.getEnvironment(0);  // refresh the environment - should we use redux?
    setTasks(environment.tasks);

    if(isModalVisible) {
      closeModal();
    }
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.mainContainer}>
      {tasks !== undefined && tasks.length > 0 ? 
      <ScrollView style={{width: '90%'}}>
        {tasks.map((task, key) => (
          <View style={styles.taskView} key={key}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={{ fontFamily: 'Bold' }}>{task.name}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Icon size={25} name="edit" style={{marginRight: 10}} />
                <Icon size={25} name="delete" style={{marginRight: 10}} onPress={() => deleteItem(task)} />
              </View>
            </View>
          </View>
        ))}
      </ScrollView> 
      : 
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'Bold', fontSize: 30, marginTop: 30}}>No tasks</Text>
      </View>
      }

      <ConfirmDeleteTaskModal 
        isModalVisible={isModalVisible} 
        closeModal={closeModal} 
        deleteTask={deleteTask}
      />

    </View>
  )
}

styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center'
  },
  taskView: {
    backgroundColor: '#FFFFFF',
    height: 85,
    marginTop: 15,
    borderRadius: 26,
    justifyContent: 'center',
    padding: 10,
  }
});

export default ListOfTasks