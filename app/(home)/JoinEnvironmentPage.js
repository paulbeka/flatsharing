import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, TextInput, SafeAreaView, Button
} from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';


const JoinEnvironmentPage = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

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


  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.inputEmailSection}>
        <Text>Join by share code:</Text>
        <TextInput style={styles.input}/>
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
  }
})

export default JoinEnvironmentPage