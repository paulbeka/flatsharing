import React from "react";
import {
  View, Text, Pressable, StyleSheet
} from 'react-native'
import Icon from "react-native-vector-icons/AntDesign";
import { useFonts, Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand'; // Import the fonts


const TaskFocusedView = ({ task, closeModal }) => {

  const [fontsLoaded] = useFonts({
    QuicksandRegular: Quicksand_400Regular,
    QuicksandBold: Quicksand_700Bold,
  });

  const taskCompleted = () => {
    closeModal()
  }

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.mainContainer}>
      <View style={{ alignItems: 'center'}}>
        <Text style={styles.title}>{task.name}</Text>
        <Icon size={200} name="home" style={styles.iconStyle}/>
        <Text>{task.description}</Text>
        <Text style={{ fontFamily: 'QuicksandRegular', fontSize: 20 }}>Finish this task by:</Text>
        <Text>{task.date}</Text>
      </View>
      <Pressable style={styles.button} onPress={taskCompleted}>
        <Text style={{
          fontSize: 22, fontFamily: 'QuicksandBold'
        }}>Task Done</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    marginTop: 15,
    marginBottom: 20,
    fontFamily: 'QuicksandBold'
  },
  iconStyle: {

  },
  button: {
    borderRadius: 26,
    padding: 10,
    width: '90%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#80BDD7',
  }
});

export default TaskFocusedView