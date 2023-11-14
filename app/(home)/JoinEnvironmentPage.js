import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, TextInput, SafeAreaView, Button, Pressable
} from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEnvironmentsStore } from "../store/EnvironmentsContext";
import CreateName from "../components/JoinEnvironmentUtil/CreateName";


const JoinEnvironmentPage = () => {
  const environmentsStore = useEnvironmentsStore();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [shareCodeText, setShareCodeText] = useState("");
  const [createNamePage, setCreateNamePage] = useState(false)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const joinEnvironment = () => {
    environmentsStore.joinEnvironment(shareCodeText)
    setCreateNamePage(true)
  }

  // Just put the scanned code into the bar
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setShareCodeText(data)
  };

  if(!createNamePage) {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.inputEmailSection}>
          <Text>Join by share code:</Text>
          <TextInput onChangeText={setShareCodeText} style={styles.input}/>
          <Pressable onPress={joinEnvironment} style={styles.joinEnvironmentButton}>
            <Text style={{ fontSize: 20, fontWeight: 'semibold' }}>Join Environment</Text>
          </Pressable>
        </View>
        <View style={styles.barcodeView}>
          <Text>Or join by scanning QR code:</Text>
          <View style={styles.barCodeScannerView}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{...StyleSheet.absoluteFillObject, borderWidth: 1}}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
          </View>
        </View>
      </SafeAreaView>
    );
  } else {
    return <CreateName />
  }

}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  inputEmailSection: {
    width: '90%'
  },
  input: {
    borderWidth: 2,
    borderColor: '#D9D9D9',
    borderRadius: 15,
    paddingLeft: 20,
    height: 60,
    width: '100%',
  },
  barcodeView: {
    width: '90%',
    height: '50%'
  },
  barCodeScannerView: {
    width: '100%', 
    height: '100%'
  },
  joinEnvironmentButton: {
    backgroundColor: '#80BDD7',
    borderRadius: 15,
    width: '90%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    marginBottom: 30
  }
})

export default JoinEnvironmentPage