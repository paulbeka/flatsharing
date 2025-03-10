import React, { useState } from "react";
import { ScrollView } from "react-native";
import {
  View, Text, Pressable, StyleSheet, Modal
} from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import { useRouter } from 'expo-router';
import TaskCreationPreset from '../components/TaskCreationPresets/TaskCreationPreset'

const TaskCreatePage = () => {
  const router = useRouter();

  const listOfTasks = [
    {title: "Bins", type: "ad_hoc", description: "Taking out the bins", icon: "delete", participants: []},
    {title: "Kitchen", type: "periodic", description: "Taking out the bins", icon: "delete", participants: []},
    {title: "Bathroom", type: "periodic", description: "Taking out the bins", icon: "delete", participants: []},
  ]

  const [taskInView, setTaskInView] = useState(listOfTasks[0])
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => {
    setIsModalVisible(false);
    setTaskInView(listOfTasks[0]); // set to 0th item to prevent null bug
  }
  
  const selectTask = (task) => {
    setTaskInView(task)
    setIsModalVisible(true)
  }

  return (
    <View style={styles.mainContainer}>
      <View style={{height: '80%', width: '100%', alignItems: 'center'}}>

      <Pressable style={styles.fillInManually} onPress={ () => { router.replace("/TaskCreationPage") }}>
        <Text style={{ fontSize: 22}}>Fill in manually</Text>
        <Icon size={25} name="pluscircle"/>
      </Pressable>

      <View
        style={{
          marginTop: 30,
          marginBottom: 30,
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
          width: '90%'
        }}
      />

      <ScrollView contentContainerStyle={{alignItems: 'center'}} style={{width: '100%'}}>
        {listOfTasks.map((task, key) => {
          return (
            <Pressable style={styles.predefinedTask} key={key} onPress={() => selectTask(task)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="delete" size={25} style={{marginRight: 15}}/>
                <Text style={{ fontSize: 22 }}>{task.title}</Text>
              </View>
              <Icon name="right" size={25} />
            </Pressable>
          )
        })}
      </ScrollView>
      </View>

      <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.taskInFocusView}>
            <Pressable style={styles.taskInFocusBackground} onPress={closeModal}>
              <TaskCreationPreset task={taskInView} closeModal={closeModal} />
            </Pressable>
          </View>
        </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  fillInManually: {
    width: '90%',
    height: 70,
    borderRadius: 25,
    backgroundColor: '#C2C2C2',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 40,
    paddingRight: 20,
    justifyContent: 'space-between',
  },
  predefinedTask: {
    width: '90%',
    height: 70,
    marginBottom: 20,
    borderRadius: 25,
    backgroundColor: '#BCD6EE',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 40,
    paddingRight: 20,
    justifyContent: 'space-between',
  },
  taskInFocusView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(80, 80, 80, 0.6)'
  },
  taskInFocusBackground: {
    height: '90%',
    width: '90%',
  },
});

export default TaskCreatePage;