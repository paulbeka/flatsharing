import React from "react";
import {
  StyleSheet, ScrollView, Text, View
} from 'react-native'
import { useEnvironmentsStore } from '../../store/EnvironmentsContext';
import NoTasksYetPage from "./NoTasksYetPage";


const HomePage = () => {
  const environmentsStore = useEnvironmentsStore();
  const environment = environmentsStore.getEnvironmentByIndex(0);
  console.log(environment)
  if(environment.tasks === undefined) {
    return <NoTasksYetPage />
  } else {
    return (
      <ScrollView contentContainerStyle={styles.homePageContainer}>
        <Text style={styles.title}>{environment.name}</Text>
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
  }
});

export default HomePage