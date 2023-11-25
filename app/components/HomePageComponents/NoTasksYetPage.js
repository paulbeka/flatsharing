import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View, Pressable, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';


const NoTasksYetPage = () => {

  return (
    <View style={styles.mainView}>
      <Text style={styles.noTasksText}>
        You have no tasks. Create new tasks or choose from a template to get started.
      </Text>
      <View>
        <Link href="/TaskCreatePage" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>
              Create New Task
            </Text>
          </Pressable>
        </Link>

        <View style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          <View>
            <Text style={{width: 50, textAlign: 'center'}}>OR</Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
        
        <Link href="/TemplatePage" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>
              Choose from template
            </Text>
          </Pressable>
        </Link>
        <View style={{}}>
          <Link href="QrGenerator" asChild>
            <Icon size={50} name="qrcode" />
          </Link>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noTasksText: {
    textAlign: 'center',
    fontSize: 18, 
    marginBottom: 20,
  },
  button: {
    padding: 15,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    width: 50,
    textAlign: 'center',
    fontSize: 16, 
  },
});

export default NoTasksYetPage;
