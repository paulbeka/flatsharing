import React, { useState } from "react";
import { Stack } from "expo-router";
import { useEnvironmentsStore } from "../store/EnvironmentsContext";
import CustomHeader from "../components/StackHeader/CustomHeader";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useFonts, Quicksand_500Medium, Quicksand_700Bold } from '@expo-google-fonts/quicksand'; // Import the fonts
import Icon from "react-native-vector-icons/AntDesign";


const ListOfTasks = () => {
  const environmentsStore = useEnvironmentsStore();
  let environment = environmentsStore.getEnvironment(0);
  
  const [tasks, setTasks] = useState(environment.tasks)

  const [fontsLoaded] = useFonts({
    Regular: Quicksand_500Medium, 
    Bold: Quicksand_700Bold
  })

  const deleteItem = (item) => {
    console.log(item)
    environment.tasks = environment.tasks.filter((el) => el !== item)
    environmentsStore.setEnvironment(environment)
    setTasks(environment.tasks)
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.mainContainer}>
      <Stack.Screen
        component={CustomHeader}
        options={{
          headerShown: true,
          header: ({ route, navigation }) => (
            <CustomHeader title={environment.name} />
          ),
        }}
      />

      {tasks.length > 0 ? 
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