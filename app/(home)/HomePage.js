import React, { useState } from "react";
import {
  StyleSheet, ScrollView, Text, View, Pressable, Modal
} from 'react-native';
import NoTasksYetPage from "../components/HomePageComponents/NoTasksYetPage";
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';
import { useFonts, Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand'; // Import the fonts
import WelcomePage from "../components/HomePageComponents/WelcomePage";
import TaskFocusedView from "../components/HomePageComponents/TaskFocusedView";
import { useEnvironmentsStore } from "../store/EnvironmentsContext";
import LoadingIcon from "../components/LoadingIcon";
import HomePageBoxedScrollTaskView from '../components/HomePageComponents/HomePageBoxedScrollTaskView'
import { daysBeforeTaskDue } from '../objects/Task';


const HomePage = () => {

  const environmentStore = useEnvironmentsStore()
  const environment = environmentStore.getEnvironment()
  const userData = environmentStore.getUserData()

  const [taskInFocus, setTaskInFocus] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTaskInFocus(null); 
  };

  const [fontsLoaded] = useFonts({
    QuicksandRegular: Quicksand_400Regular,
    QuicksandBold: Quicksand_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  if(environment === null) {
    return <LoadingIcon />
  }
  if(environment === undefined) {
    return <WelcomePage />
  }
  if(environment.tasks === undefined || environment.tasks.length === 0) {
    return <NoTasksYetPage />;
  } else {

    // TODO: redo this logic
    let usersTasksToday = environment.tasks.filter((el) => 
      environmentStore.userData["username"] in el.flatmates
      && daysBeforeTaskDue(el) === 0
    );
    let usersTasksFuture = environment.tasks.filter(
      (el) => environmentStore.userData["username"] in el.flatmates
      && !(el in usersTasksToday)
    );
    let flatmatesTasks = environment.tasks.filter((el) => !(environmentStore.userData["username"] in el.flatmates));

    return (
      <View style={{justifyContent: 'space-between', height: '100%', paddingTop: 25}}>
        
        <ScrollView contentContainerStyle={styles.homePageContainer}>
          <Text style={styles.title}>Hi, {userData.username}!</Text>

          <Text style={{ ...styles.subTitle, marginTop: 10, fontFamily: 'QuicksandBold' }}>Today's tasks:</Text>
          <HomePageBoxedScrollTaskView tasks={usersTasksToday} taskFocusCallback={setTaskInFocus} openModal={openModal}/>
          
          <Text style={{ ...styles.subTitle, fontFamily: 'QuicksandBold', marginTop: 20 }}>Your upcoming tasks...</Text>
          <HomePageBoxedScrollTaskView tasks={usersTasksFuture} taskFocusCallback={setTaskInFocus} openModal={openModal}/>
        
          <Text style={{ ...styles.subTitle, fontFamily: 'QuicksandBold', marginTop: 20 }}>Your flatmates' tasks...</Text>
          <HomePageBoxedScrollTaskView tasks={flatmatesTasks} taskFocusCallback={setTaskInFocus} openModal={openModal}/>

        </ScrollView>

        <View style={styles.addNewTaskView}>
          <Link href="QrGenerator" asChild>
            <Icon size={50} name="qrcode" />
          </Link>
          <Link href="/TaskCreatePage" asChild>
            <Pressable style={styles.addNewTaskPressable}>
              <View style={{ justifyContent: 'center' }}>
                <Text style={{ ...styles.addNewTaskText, fontFamily: 'QuicksandBold' }}>Add new task</Text>
              </View>
              <Icon size={40} color="#80BDD7" name="pluscircle" />
            </Pressable>
          </Link>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.taskInFocusView}>
            <Pressable style={styles.taskInFocusBackground} onPress={closeModal}>
              <TaskFocusedView task={taskInFocus} closeModal={closeModal}/>
            </Pressable>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homePageContainer: {
    paddingLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  yourTasksScroll: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
  },
  addNewTaskView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10
  },
  addNewTaskPressable: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    margin: 18,
    marginRight: 28
  },
  addNewTaskText: {
    color: '#80BDD7',
    marginRight: 5,
  },

  taskInFocusView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(80, 80, 80, 0.6)'
  },
  taskInFocusBackground: {
    height: '90%',
    width: '90%',
  }
});

export default HomePage;
