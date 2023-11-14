import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import { useEnvironmentsStore } from "../store/EnvironmentsContext";
import QRCode from 'react-native-qrcode-svg';
import CustomHeader from "../components/StackHeader/CustomHeader";


const QrGenerator = () => {
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

      <View style={styles.qrcodeContainer}>
        <Text>Scan this QR code to join my flat:</Text>
        <QRCode
          value={environment.envId}
          size={250}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
  },
  qrcodeContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default QrGenerator