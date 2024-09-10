import React from 'react';
import {
  StyleSheet, ScrollView, Text, View, Pressable, Modal
} from 'react-native';


const ConfirmDeleteTaskModal = ({isModalVisible, closeModal}) => {

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.taskInFocusView}>
        <Pressable style={styles.taskInFocusBackground} onPress={closeModal}>
          
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
  }
});


export default ConfirmDeleteTaskModal;