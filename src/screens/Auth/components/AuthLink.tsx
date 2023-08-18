import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from 'react-native';
import React from 'react';

interface ExtraButtonProps {
  linkText: string;
  description: string;
}
//Touchable opacity default props and custom props for this button
const AuthLink: React.FC<ExtraButtonProps & TouchableOpacityProps> = ({
  linkText,
  description,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity {...props}>
        <Text style={styles.linkText}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthLink;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  linkText: {
    color: '#000',
    fontWeight: '900',
    fontSize: 16,
    textDecorationLine: 'underline',
    fontFamily: 'Inter-Medium'
  },
  description: {
    color: '#000',
    fontWeight: '800',
    fontSize: 16,
    marginRight: 15,
    fontFamily: 'Inter-Medium'
  }
});
