import React, { ReactNode } from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';

const CommonModal = ({
  isShow,
  onClose,
  children
}: {
  isShow: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isShow}
      onDismiss={() => {
        onClose();
      }}
    >
      <View style={styles.centeredView}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(51, 46, 46, 0.4)'
          }}
        >
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <View style={styles.modalView}>{children}</View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    position: 'absolute',
    zIndex: 10,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});

export default CommonModal;
