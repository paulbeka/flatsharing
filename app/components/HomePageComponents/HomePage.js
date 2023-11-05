import React from "react";
import {
  StyleSheet, ScrollView, Text, View, Pressable
} from 'react-native'
import { useEnvironmentsStore } from '../../store/EnvironmentsContext';
import NoTasksYetPage from "./NoTasksYetPage";
import { Link, Stack } from 'expo-router';
import Icon from 'react-native-vector-icons/Entypo';


const HomePage = () => {
  const environmentsStore = useEnvironmentsStore();
  const environment = environmentsStore.getEnvironmentByIndex(0);
  
  const handleAddNewTask = () => {

  }

  if(environment.tasks === undefined) {
    return <NoTasksYetPage />
  } else {
    return (
      <ScrollView contentContainerStyle={styles.homePageContainer}>
        <Stack.Screen
        options={{
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: environment.name,
        }}
      />
        <Text style={styles.subTitle}>Your upcoming tasks...</Text>
        <ScrollView  horizontal={true}>
          {environment.tasks.map((task, key) => {
            return (
              <View style={styles.yourTaskView}>
                <Text>{task.name}</Text>
                <Text>{task.description}</Text>
                <Text>{task.flatmatesIncluded[0]}</Text>
              </View>
            )
          })}
        </ScrollView>
        <View style={styles.addNewTaskView}>
          <Link href="/TaskCreationPage" asChild>
            <Pressable style={styles.addNewTaskPressable} onPress={handleAddNewTask}>
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.addNewTaskText}>Add new task</Text>
              </View>
              <Icon size={50} color="blue" name="circle-with-plus" />
            </Pressable>
          </Link>
        </View>
      </ScrollView>)
  }
}

const styles = StyleSheet.create({
  homePageContainer: {
    flex: 1,
    paddingLeft: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  subTitle: {
    fontSize: 18,
    color: '#949494',
    marginBottom: 5,
  },
  yourTasksScroll: {
    flex: 1,
    width: '100%',
    borderWidth: 1
  },  
  yourTaskView: {
    borderWidth: 1,
    margin: 5,
    width: 100,
    height: 100,
    borderRadius: 5,
    padding: 3
  },
  addNewTaskView: {
    width: '100%',
  },
  addNewTaskPressable: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    margin: 18,
  },
  addNewTaskText: {
    color: 'blue',
    marginRight: 5
  }
});

export default HomePage