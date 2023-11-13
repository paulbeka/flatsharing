import React from "react";
import {
  StyleSheet, ScrollView, Text, View, Pressable
} from 'react-native';
import NoTasksYetPage from "../components/HomePageComponents/NoTasksYetPage";
import { Link, Stack } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';
import { useFonts, Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand'; // Import the fonts
import CustomHeader from '../components/StackHeader/CustomHeader'
import WelcomePage from "../components/HomePageComponents/WelcomePage";
import { useEnvironmentsStore } from "../store/EnvironmentsContext";


const HomePage = () => {
  const environmentStore = useEnvironmentsStore()
  const environment = environmentStore.getEnvironmentByIndex(0)

  const [fontsLoaded] = useFonts({
    QuicksandRegular: Quicksand_400Regular,
    QuicksandBold: Quicksand_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  if(environment === null) {
    environment = environmentStore.getEnvironmentByIndex(0)
    return <></>
  }
  if(environment === undefined) {
    return <WelcomePage />
  }
  if(environment.tasks === undefined) {
    return <NoTasksYetPage />;
  } else {
    return (
      <ScrollView contentContainerStyle={styles.homePageContainer}>
        <Stack.Screen
          component={CustomHeader}
          options={{
            headerShown: true,
            header: ({ route, navigation }) => (
              <CustomHeader title={environment.name} />
            ),
          }}
        />
        <Text style={{ ...styles.subTitle, marginTop: 10, fontFamily: 'QuicksandBold' }}>Today's tasks:</Text>
        <Text style={{ fontFamily: 'QuicksandRegular' }}>No tasks today! :D</Text>
        <Text style={{ ...styles.subTitle, fontFamily: 'QuicksandBold', marginTop: 20 }}>Your upcoming tasks...</Text>
        <ScrollView horizontal={true}>
          {environment.tasks.map((task, key) => {
            return (
              <View style={styles.yourTaskView} key={key}>
                <Text style={{ fontFamily: 'QuicksandRegular' }}>{task.name}</Text>
                <Text style={{ fontFamily: 'QuicksandRegular' }}>{task.description}</Text>
                <Text style={{ fontFamily: 'QuicksandRegular' }}>{task.flatmatesIncluded[0].name}</Text>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.addNewTaskView}>
          <Link href="QrGenerator" asChild>
            <Icon size={50} name="qrcode" />
          </Link>
          <Link href="/TaskCreationPage" asChild>
            <Pressable style={styles.addNewTaskPressable}>
              <View style={{ justifyContent: 'center' }}>
                <Text style={{ ...styles.addNewTaskText, fontFamily: 'QuicksandBold' }}>Add new task</Text>
              </View>
              <Icon size={40} color="#80BDD7" name="pluscircle" />
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  homePageContainer: {
    flex: 1,
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
  yourTaskView: {
    borderWidth: 1,
    margin: 5,
    width: 100,
    height: 100,
    borderRadius: 5,
    padding: 3,
  },
  addNewTaskView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  addNewTaskPressable: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    margin: 18,
  },
  addNewTaskText: {
    color: '#80BDD7',
    marginRight: 5,
  },
});

export default HomePage;
