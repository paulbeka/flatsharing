import React, { useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, Pressable } from 'react-native'
import { useEnvironmentsStore } from "../store/EnvironmentsContext";
import QRCode from 'react-native-qrcode-svg';
import { observer  } from 'mobx-react';


const QrGenerator = observer((incCurrentPage) => {
  const environmentsStore = useEnvironmentsStore();
  let environment = environmentsStore.getEnvironment();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.qrcodeContainer}>
        <Text>Scan this QR code to join my flat:</Text>
        {environment !== undefined && environment.envId !== undefined ? 
        <QRCode
          value={environment.envId}
          size={250}
        /> : <></>}
      </View>
      <View>
        <Text>Share link for others to join:</Text>
        {/* Some kind of share link here */}
      </View>

      <View>
        <Text>Or, use this share code to join:</Text>
        <Text>{environmentsStore.environments !== undefined && environmentsStore.environments.envId !== undefined ? 
        environment.envId : "Waiting..."}</Text>
      </View>

      {incCurrentPage === undefined ? <></> :
      <Pressable style={styles.nextPageButton} onPress={incCurrentPage.nextItem}>
        <Text>Next</Text>
      </Pressable>}
    </View>
  )
});

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrcodeContainer: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextPageButton: {
    width: '90%',
    height: 60,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  }
})

export default QrGenerator