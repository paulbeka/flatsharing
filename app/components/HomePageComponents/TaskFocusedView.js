import React from "react";
import {
  View, Text, Pressable, StyleSheet
} from 'react-native'
import Icon from "react-native-vector-icons/AntDesign";
import { useFonts, Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import { getGetDoneByDate } from '../../objects/Task';
import { useTaskDatabaseHandler } from '../../store/EnvironmentEventHandler';
import LoadingIcon from '../LoadingIcon';


const TaskFocusedView = ({ task, closeModal }) => {
  const taskDatabaseHandler = useTaskDatabaseHandler();

  const [fontsLoaded] = useFonts({
    QuicksandRegular: Quicksand_400Regular,
    QuicksandBold: Quicksand_700Bold,
  });

  const taskCompleted = () => {
    const currentFlatmateIndex = task.flatmates.findIndex(flatmate => flatmate === task.next);
    const nextFlatmateIndex = currentFlatmateIndex > task.flatmates.length-1 ? 0 : currentFlatmateIndex + 1;
    const newNextFlatmate = task.flatmates[nextFlatmateIndex];

    const newTask = { ...task, 
      next: newNextFlatmate,
      dateLastCompleted: Date.now()
    }

    taskDatabaseHandler.deleteTaskOnDatabase(task);
    taskDatabaseHandler.updateTaskOnDatabase(newTask);
    closeModal();
  }

  if (!fontsLoaded) {
    return <LoadingIcon />;
  }
  return (
    <View style={styles.mainContainer}>
      <View style={{ alignItems: 'center'}}>
        <Text style={styles.title}>{task.name}</Text>
        <Icon size={200} name={task.icon} style={styles.iconStyle}/>
        <Text style={{marginTop: 20, marginBottom: 20, fontFamily: 'QuicksandRegular', fontSize: 20}}>{task.description}</Text>
        {task.type === 0 ?
        <>
          <Text style={{ fontFamily: 'QuicksandRegular', fontSize: 30 }}>Finish this task by:</Text>
          <Text style={{marginTop: 20, fontFamily: 'QuicksandRegular', fontSize: 20}}>
            {getGetDoneByDate(task).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })}
          </Text>
        </> :
        <>
          <Text>You're the next person responsible to complete this task! Click the "Complete" button once the task has been completed. Don't wait too long to finish it!</Text>
        </>
        }
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
    width: '80%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#80BDD7',
  }
});

export default TaskFocusedView