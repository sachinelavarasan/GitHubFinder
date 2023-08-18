import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View
} from 'react-native';

interface ExtraInputProps {
  label?: string;
  borderLess?: boolean;
  isTextBox?: boolean;
  isPassword?: boolean;
  error?: string | null;
  isTitle?: boolean;
}

const Input: React.FC<ExtraInputProps & TextInputProps> = ({
  label,
  borderLess,
  isTextBox,
  isPassword,
  error,
  isTitle,
  ...props
}) => {
  const [show, setShow] = useState(false);
  return (
    <View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[styles.inputContainer, borderLess ? styles.borderNone : null]}
      >
        <View style={styles.innerView}>
          <TextInput
            {...props}
            style={[
              styles.input,
              isTitle ? styles.titleText : null,
              isTextBox ? styles.textBox : null
            ]}
            secureTextEntry={isPassword && !show}
            autoCorrect={false}
            autoComplete={'off'}
            selectTextOnFocus={false}
            autoCapitalize="none"
            spellCheck={false}
            placeholderTextColor={'#999999'}
            selectionColor="#000"
          />
          {isPassword ? (
            <TouchableOpacity onPress={() => setShow((state) => !state)}>
              <Image
                style={styles.inputIconPassword}
                source={
                  show
                    ? require('../../assets/icons/eye_open.png')
                    : require('../../assets/icons/eye_close.png')
                }
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: '#F2F2F2',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 0
  },
  textBox: {
    height: 130,
    paddingLeft: 14,
    paddingTop: 16,
    paddingRight: 21
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    borderWidth: 0,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-Medium',
    color: '#000',
    paddingHorizontal: 24
  },
  label: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    marginBottom: 2,
    fontFamily: 'Inter-Medium'
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginBottom: 3,
    position: 'absolute',
    marginTop: 70
  },
  inputIconPassword: {
    height: 20,
    width: 20,
    marginRight: 12
  },
  borderNone: {
    borderWidth: 0
  },
  titleText: {
    fontSize: 15,
    fontWeight: '900'
  }
});
