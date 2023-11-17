import React, { useState } from "react";
import {
  View, Text, SafeAreaView, StyleSheet, Pressable
} from 'react-native'
import { Stack, Link, useRouter } from 'expo-router';
import CustomHeader from "../components/StackHeader/CustomHeader";
import { useEnvironmentsStore } from "../store/EnvironmentsContext";
import { ScrollView } from "react-native-gesture-handler";
import { useFonts, Quicksand_500Medium, Quicksand_700Bold } from '@expo-google-fonts/quicksand'; // Import the fonts
import Icon from "react-native-vector-icons/AntDesign";
import { auth } from "../../firebaseConfig";


const Settings = () => {
  const environmentsStore = useEnvironmentsStore();
  const environment = environmentsStore.getEnvironment(0);

  const router = useRouter()

  const [settingsIcons, setSettingsIcons] = useState([
    {"title": "Account", "iconName": "user", "link": "SettingPages/AccountManagementPage"},
    {"title": "Notifications", "iconName": "bells", "link": "SettingPages/NotificationManagementPage"},
    {"title": "Theme", "iconName": "tool", "link": "AccountManagementPage"},
    // TODO: We may need to remove this option depending how it works, or change entirely this functionality
    {"title": "Flatmate management", "iconName": "edit", "link": "AccountManagementPage"},
  ]);

  const [fontsLoaded] = useFonts({
    Regular: Quicksand_500Medium, 
    Bold: Quicksand_700Bold
  })

  const logout = () => {
    auth.signOut().then(() => {
      environmentsStore.emptyEnvironments()
      router.replace("/")
    }).catch((error) => {
      console.log(error)
    });
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Stack.Screen
        component={CustomHeader}
        options={{
          headerShown: true,
          header: ({ route, navigation }) => (
            <CustomHeader title="Profile Page" />
          ),
        }}
      />

      <View style={{ marginBottom: 10 }}>
        <Text style={{fontFamily: 'Bold', fontSize: 32}}>Settings</Text>
      </View>
      
      <ScrollView>
        {settingsIcons.map((setting, key) => {
          return (
            <Link href={setting.link} key={key} asChild>
              <Pressable style={styles.settingsView}>
                <View style={styles.settingsIconAndTextView}>
                  <Icon size={30} name={setting.iconName} />
                  <Text style={{ fontFamily: 'Regular', marginLeft: 15 }}>{setting.title}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 15 }}>
                  <Icon size={25} name="right" />
                </View>
              </Pressable>
            </Link>
          )
        })}
      </ScrollView>
      
      <View style={styles.logoutView}>
        <Pressable style={styles.logoutButton} onPress={logout}>
          <Icon size={25} name="logout" color="red" />
          <Text style={{ fontFamily: 'Regular', marginLeft: 10, color: 'red'}}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 10
  },
  settingsView: {
    backgroundColor: '#D9D9D9',
    borderRadius: 26,
    height: 68,
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
  },
  settingsIconAndTextView: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginLeft: 15
  },
  logoutView: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  logoutButton: {
    backgroundColor: '#D9D9D9',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 26,
    padding: 20,
    marginBottom: 5
  }
});

export default Settings