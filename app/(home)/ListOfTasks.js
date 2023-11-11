import React, { useState } from "react";
import { Stack } from "expo-router";
import { useEnvironmentsStore } from "../store/EnvironmentsContext";
import CustomHeader from "../components/StackHeader/CustomHeader";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useFonts, Quicksand_500Medium, Quicksand_700Bold } from '@expo-google-fonts/quicksand'; // Import the fonts
import Icon from "react-native-vector-icons/AntDesign";


const ListOfTasks = () => {
  const environmentsStore = useEnvironmentsStore();
  const environment = environmentsStore.getEnvironmentByIndex(0);
  
  const [tasks, setTasks] = useState(environment.tasks)

  const [fontsLoaded] = useFonts({
    Regular: Quicksand_500Medium, 
    Bold: Quicksand_700Bold
  })

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

      <ScrollView style={{width: '90%'}}>
        {tasks.map((task) => (
          <View style={styles.taskView}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={{ fontFamily: 'Bold' }}>{task.name}</Text>
              <Icon size={25} name="edit" style={{marginRight: 10}} />
            </View>
          </View>
        ))}
      </ScrollView>

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