import React from "react";
import { 
  ScrollView, Pressable, Text, StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';


const HomePageBoxedScrollTaskView = ({tasks, taskFocusCallback, openModal}) => {
  return (
    <ScrollView horizontal={true}>
      {tasks.length ? 
      tasks.map((task, key) => {
        return (
          <Pressable style={styles.boxedTaskView} key={key} onPress={() => {taskFocusCallback(task); openModal()}}>
            <Text style={{ fontFamily: 'QuicksandRegular' }}>{task.name}</Text>
            <Text style={{ fontFamily: 'QuicksandRegular' }}>{task.description}</Text>
            <Icon size={30} name={task.icon} />
          </Pressable>
        );
      }) : <Text style={{ fontFamily: 'QuicksandRegular' }}>No tasks!</Text>}
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  boxedTaskView: {
    borderWidth: 1,
    margin: 5,
    width: 200,
    height: 200,
    borderRadius: 15,
    padding: 3,
  },
})


export default HomePageBoxedScrollTaskView;
