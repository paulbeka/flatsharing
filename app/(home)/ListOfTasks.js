import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useEnvironmentsStore } from "../store/EnvironmentsContext";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useFonts, Quicksand_500Medium, Quicksand_700Bold } from '@expo-google-fonts/quicksand'; // Import the fonts
import Icon from "react-native-vector-icons/AntDesign";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cancelNotification } from "../notifications/NotificationsHandler";


const ListOfTasks = () => {
  const environmentsStore = useEnvironmentsStore();
  const router = useRouter()
  let environment = environmentsStore.getEnvironment(0);
  
  const [tasks, setTasks] = useState(environment.tasks)

  const [fontsLoaded] = useFonts({
    Regular: Quicksand_500Medium, 
    Bold: Quicksand_700Bold
  })

  // fix this for the last items
  const deleteItem = (item) => {
    if(item.type === 0) {
      AsyncStorage.getItem(item.name).then((id) => {
        cancelNotification(id);
      })
    }
    environment.tasks = environment.tasks.filter((el) => el !== item)
    if(environment.tasks.length <= 0) {
      environment.tasks = []
      setTasks(environment.tasks)
      environmentsStore.setEnvironment(environment)
      router.replace("/")
    } else {
      setTasks(environment.tasks)
      environmentsStore.setEnvironment(environment)
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
                <Icon size={25} name="delete" style={{marginRight: 10}} onPress={()=>deleteItem(task)} />
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