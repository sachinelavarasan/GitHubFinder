import { useRef, useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View
} from "react-native";

import PasswordVisible from "../../assets/icons/passowrd-visible.svg";
import PasswordHide from "../../assets/icons/eye-off.svg";

interface ExtraInputProps {
  label?: string;
  borderBottom?: boolean;
  isTextBox?: boolean;
  isPassword?: boolean;
  error?: string | null;
  isTitle?: boolean;
  labelStyle?: any;
}

const Input: React.FC<ExtraInputProps & TextInputProps> = ({
  label,
  borderBottom,
  isTextBox,
  isPassword,
  error,
  isTitle,
  labelStyle,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const inputRef = useRef<View | null>(null);

  const handleFocus = () => {
    inputRef?.current?.setNativeProps({
      style: styles.focusedInput
    });
  };

  const handleBlur = () => {
    inputRef?.current?.setNativeProps({
      style: styles.blurredInput
    });
  };

  return (
    <View>
      {label ? (
        <Text style={[styles.label, labelStyle ? labelStyle : null]}>
          {label}
        </Text>
      ) : null}
      <View
        ref={inputRef}
        style={[
          styles.inputContainer,
          borderBottom ? styles.borderBottom : null
        ]}
      >
        <View style={styles.innerView}>
          <TextInput
            {...props}
            style={[
              styles.input,
              isTitle ? styles.titleText : null,
              isTextBox ? styles.textBox : null,
              borderBottom ? { paddingLeft: 6, paddingVertical: 6 } : null
            ]}
            secureTextEntry={isPassword && !show}
            autoCorrect={false}
            autoComplete={"off"}
            selectTextOnFocus={false}
            autoCapitalize="none"
            spellCheck={false}
            placeholderTextColor={"#ffffffad"}
            selectionColor="#000"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onEndEditing={handleBlur}
          />
          {isPassword ? (
            <TouchableOpacity
              onPress={() => setShow((state) => !state)}
              style={{ marginRight: 10 }}
            >
              {show ? <PasswordVisible /> : <PasswordHide />}
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
    borderColor: "#F2F2F2",
    borderRadius: 4,
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
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    flex: 1,
    borderWidth: 0,
    paddingVertical: 6,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Inter-Medium",
    color: "#fff",
    paddingHorizontal: 20
  },
  label: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
    marginBottom: 2,
    fontFamily: "Inter-Medium"
  },
  error: {
    fontSize: 12,
    color: "red",
    marginBottom: 3,
    position: "absolute",
    marginTop: 80,
    marginLeft: 5
  },
  inputIconPassword: {
    height: 20,
    width: 20,
    marginRight: 12
  },
  borderBottom: {
    borderWidth: 0,
    borderBottomWidth: 1
  },
  titleText: {
    fontSize: 15,
    fontWeight: "900"
  },
  focusedInput: {
    borderColor: "#FF5C00" // Change to the color you want for focused state
  },
  blurredInput: {
    borderColor: "#F2F2F2" // Change to the color you want for blurred state
  }
});
