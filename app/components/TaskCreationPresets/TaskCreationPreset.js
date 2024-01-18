import React, { useState } from "react";
import {
  View, Text, StyleSheet, Pressable, ToastAndroid
} from 'react-native';
import { useEnvironmentsStore } from "../../store/EnvironmentsContext";
import Icon from "react-native-vector-icons/AntDesign";
import FlatmatePicker from "../GeneralUtil/FlatmatePicker";
import { Task } from "../../objects/Task";
import TimePicker from "../GeneralUtil/TimePicker";


const TaskCreationPreset = ({task, closeModal}) => {
  const environmentsStore = useEnvironmentsStore();
  const environment = environmentsStore.getEnvironment()

  const [flatmatesIncluded, setFlatmatesIncluded] = useState(
    environment.flatmates.map((x) => {return {"name": x, "isIncluded": true}})
  )

  const [timeInterval, setTimeInterval] = useState(null)

  const createTask = () => {
    const flatmates = flatmatesIncluded.map(item => item.name);
    const newTask = Task(
      task.title, 
      task.description, 
      taskType === "ad_hoc" ? 1 : 0, 
      flatmates, 
      task.icon, 
      timeInterval
    );

    if(environment.tasks) {
      environment.tasks.push(newTask)
    } else {
      environment.tasks = [newTask]
    }
    environmentsStore.setEnvironment(environment)

    ToastAndroid.show('Task created.', ToastAndroid.SHORT);
    closeModal()
  }
  console.log(task)
  // This should contain a brief explanation of what's going on, and settings for 
  // the number of times it happens and who is involved.
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.modalTitle}>{task.title}</Text>
      <Icon name={task.icon} size={75} />
      <Text style={{marginVertical: 20}}>{task.description}</Text>

      {task.type === "periodic" ? 
      <TimePicker 
        timeInterval={timeInterval}
        setTimeInterval={setTimeInterval}
        taskType={0}
      />
      : <></>}


      <View style={{ width: "90%", marginTop: 20 }}>
        <FlatmatePicker
          flatmatesIncluded={flatmatesIncluded}
          setFlatmatesIncluded={setFlatmatesIncluded}
        />
      </View>
      
      <Pressable style={styles.addTaskButton} onPress={createTask}>
        <Text style={{ color: "white" }}>Add task</Text>
      </Pressable>
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
    fontWeight: 'bold',
    marginTop: 30, 
    marginBottom: 20
  },
  addTaskButton: {
    width: "75%",
    borderRadius: 25,
    backgroundColor: "black",
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default TaskCreationPreset