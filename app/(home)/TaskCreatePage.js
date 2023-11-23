import React, { useState } from "react";
import { ScrollView } from "react-native";
import {
  View, Text, Pressable, StyleSheet
} from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import { Link } from 'expo-router'


const TaskCreatePage = () => {
  const listOfTasks = [{
    title: "Bins", href: "/"
  }]

  return (
    <View style={styles.mainContainer}>
      <View style={{height: '70%', width: '100%', alignItems: 'center'}}>

      <Pressable style={styles.fillInManually}>
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
            <View key={key} style={styles.predefinedTask}>
              <Link href={task.href}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon name="delete" size={25} style={{marginRight: 15}}/>
                  <Text style={{ fontSize: 22 }}>{task.title}</Text>
                </View>
                <Icon name="right" size={25} />
              </Link>
            </View>
          )
        })}
      </ScrollView>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
    borderRadius: 25,
    backgroundColor: '#BCD6EE',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 40,
    paddingRight: 20,
    justifyContent: 'space-between',
  }
});

export default TaskCreatePage;