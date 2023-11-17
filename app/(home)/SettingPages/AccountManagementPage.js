import React from "react";
import {
  View, Text, StyleSheet, SafeAreaView, Pressable
} from 'react-native'
import { Stack } from 'expo-router';
import CustomHeader from "../../components/StackHeader/CustomHeader";
import { useEnvironmentsStore } from "../../store/EnvironmentsContext";


const AccountManagementPage = () => {
  const environmentsStore = useEnvironmentsStore();
  const environment = environmentsStore.getEnvironment(0);

  const onPressChangePassword = () => {
    // display some kind of modal to change password and confirm
  }

  const onDeleteAccount = () => {
    // display modal asking for password to confirm action
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Stack.Screen
        component={CustomHeader}
        options={{
          headerShown: true,
          header: ({ route, navigation }) => (
            <CustomHeader title={environment.name} />
          ),
        }}
      />

      <View style={{ marginBottom: 10 }}>
        <Text style={{fontFamily: 'Bold', fontSize: 32}}>Account</Text>
      </View>

      <View style={styles.profilePictureView}>
        <Pressable>
          <Text>Profile picture displayed here (pressable to change)</Text>
        </Pressable>
      </View>

      <View style={styles.optionButtons}>
        <Pressable style={{...styles.button, backgroundColor: '#D9D9D9'}}>
          <Text style={styles.buttonText}>Change Password</Text>
        </Pressable>
        <Pressable style={{...styles.button, backgroundColor: '#f04646'}}>
          <Text style={styles.buttonText}>Delete Account</Text>
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
  profilePictureView: {
    alignItems: 'center'
  },
  optionButtons: {
    alignItems: 'center',
    marginTop: 20
  },
  button: {
    borderRadius: 26,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    flexDirection: 'row',
    width: '90%'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default AccountManagementPage