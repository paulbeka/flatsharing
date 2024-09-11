import React from 'react';
import {
  StyleSheet, Text, View, Pressable, Modal
} from 'react-native';


const ConfirmDeleteTaskModal = ({isModalVisible, closeModal, deleteTask}) => {

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
            <Text style={{}}>Confirmation</Text>
            <Text style={{}}>Are you sure you want to delete this task? Once deleted, it cannot be recovered.</Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Pressable style={styles.confirmButton} onClick={deleteTask}>Confirm</Pressable>
              <Pressable style={styles.goBackButton} onClick={closeModal}>Go Back</Pressable>
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
  confirmButton: {
    
  },
  goBackButton: {

  }
});


export default ConfirmDeleteTaskModal;