import React from 'react';
import {
  StyleSheet, Text, View, Pressable, Modal
} from 'react-native';
import LoadingIcon from '../LoadingIcon';
import { useFonts, Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';


const ConfirmDeleteTaskModal = ({isModalVisible, closeModal, editTask}) => {
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
            <Text style={styles.title}>Edit task</Text>
            
          </View>
        </Pressable>
      </View>
    </Modal>
  )
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
});

export default ConfirmDeleteTaskModal;