import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const Button = ({
  onPress,
  buttonText,
  icon
}: {
  onPress(): void;
  buttonText: string;
  icon?: number;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
      {icon ? <Image source={icon} style={styles.iconImage} /> : null}
      <Text style={styles.text}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired
};

export default Button;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15
  },
  text: {
    color: '#1F1F1F',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    fontWeight: '600'
  },
  iconImage: {
    height: 15,
    width: 15,
    marginRight: 5
  }
});
