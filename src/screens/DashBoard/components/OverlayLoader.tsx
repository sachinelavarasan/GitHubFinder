import { Modal, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const OverlayLoader = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Updating...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OverlayLoader;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(238,238,238,0.5)'
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1
  },
  modalText: {
    textAlign: 'center'
  }
});
