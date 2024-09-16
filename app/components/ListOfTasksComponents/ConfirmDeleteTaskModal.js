import React from 'react';
import {
  StyleSheet, Text, View, Pressable, Modal
} from 'react-native';
import LoadingIcon from '../LoadingIcon';
import { useFonts, Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';


const ConfirmDeleteTaskModal = ({isModalVisible, closeModal, deleteTask}) => {

  const [fontsLoaded] = useFonts({
    QuicksandRegular: Quicksand_400Regular,
    QuicksandBold: Quicksand_700Bold,
  });

  if(!fontsLoaded) {
    return <LoadingIcon />
  }
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.taskInFocusView}>
        <Pressable style={styles.taskInFocusBackground} onPress={closeModal}>
          <View style={styles.mainContainer}>
            <Text style={styles.title}>Confirmation</Text>
            <Text style={{padding: 20, marginTop: 20, fontFamily: 'QuicksandRegular', fontSize: 18}}>Are you sure you want to delete this task? Once deleted, it cannot be recovered.</Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Pressable style={styles.confirmButton} onPress={deleteTask}>
                <Text>Confirm</Text>
              </Pressable>
              <Pressable style={styles.goBackButton} onPress={closeModal}>
                <Text>Go Back</Text>
              </Pressable>
            </View>
          </View>        
        </Pressable>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
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
  },
  mainContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    backgroundColor: '#cdd1d4',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    marginTop: 50,
    marginBottom: 30,
    fontFamily: 'QuicksandBold'
  },
  confirmButton: {
    borderRadius: 14,
    padding: 10,
    width: '40%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#60e665',
    marginRight: 10
  },
  goBackButton: {
    borderRadius: 14,
    padding: 10,
    width: '40%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#f03535',
    marginLeft: 10
  }
});


export default ConfirmDeleteTaskModal;