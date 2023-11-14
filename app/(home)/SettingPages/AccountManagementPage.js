import React from "react";
import {
  View, Text, StyleSheet, SafeAreaView
} from 'react-native'
import { Stack } from 'expo-router';
import CustomHeader from "../../components/StackHeader/CustomHeader";
import { useEnvironmentsStore } from "../../store/EnvironmentsContext";


const AccountManagementPage = () => {
  const environmentsStore = useEnvironmentsStore();
  const environment = environmentsStore.getEnvironment(0);

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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 10
  }
})

export default AccountManagementPage