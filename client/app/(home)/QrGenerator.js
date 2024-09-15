import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ToastAndroid, StyleSheet, Pressable, Share } from 'react-native'
import { useEnvironmentsStore } from "../store/EnvironmentsContext";
import QRCode from 'react-native-qrcode-svg';
import { observer  } from 'mobx-react';
import Icon from "react-native-vector-icons/AntDesign";
import SplitLine from '../components/GeneralUtil/SplitLine'
import { useRouter } from 'expo-router'
import { setStringAsync } from 'expo-clipboard';


const QrGenerator = observer((incCurrentPage) => {
  const environmentsStore = useEnvironmentsStore();
  let environment = environmentsStore.getEnvironment();
  const router = useRouter()

  const openShare = async () => {
    await Share.share({
      message: 'Check out this awesome link: https://example.com',
    });
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={{fontSize: 24, fontWeight: 'bold', margin: 20}}>Invite your flatmates</Text>
      <Pressable style={styles.shareLinkButton} onPress={openShare}>
        <Text style={{color: "white", fontSize: 18 }}>Share invite link</Text>
        <Icon name="sharealt" color="white" size={30}/>
      </Pressable>

      <View style={{ width: "80%", marginTop: 20}}>
        <SplitLine content={"OR"} />
      </View>

      <View style={{width: "70%"}}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20, marginTop: 20}}>Scan the QR code</Text>
        <View style={styles.qrcodeContainer}>
          {environment !== undefined && environment.envId !== undefined ? 
          <QRCode
            value={environment.envId}
            size={175}
          /> : <></>}
        </View>
      </View>
     
      <View style={{ width: "80%", marginTop: 20}}>
        <SplitLine content={"OR"} />
      </View>

      <View>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5, marginTop: 20}}>Use the sharecode</Text>
        <TouchableOpacity  style={styles.shareCodeButton} onPress={() => {setStringAsync(environment.envId); ToastAndroid.show('Text copied', ToastAndroid.SHORT);}}>
          <Icon name="copy1" size={20} />
          <Text
            style={{ fontSize: 16, fontWeight: "bold", paddingLeft: 10 }}
          >{environmentsStore.environments !== undefined && environmentsStore.environments.envId !== undefined ? 
          environment.envId : "Waiting..."}</Text>
        </TouchableOpacity >
      </View>

      {/* goto home or next page in task creation process */}
      {incCurrentPage["segment"] === "QrGenerator" ? 
      <Pressable style={styles.nextPageButton} onPress={() => {router.replace("/")}}>
        <Text style={{ color: "white", fontSize: 18}}>Home</Text>
      </Pressable>
      :
      <Pressable style={styles.nextPageButton} onPress={incCurrentPage.nextItem}>
        <Text style={{ color: "white", fontSize: 18}}>Home</Text>
      </Pressable>}
    </View>
  )
});

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  },
  shareLinkButton: {
    borderRadius: 25,
    height: 60,
    backgroundColor: "black",
    width: '80%',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 40
  },
  qrcodeContainer: {
    alignItems: 'center',
  },
  nextPageButton: {
    width: '80%',
    height: 60,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  shareCodeButton: {
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
    flexDirection: "row"
  }
})

export default QrGenerator