// SearchBar.js
import React, { useState } from "react";
import { StyleSheet, TextInput, View, Keyboard } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

interface Props {
  searchPhrase: string;
  onChange: (e: any) => void;
  onClick: (searchPhrase: string) => void;
  onClose: () => void;
}

const SearchBar = ({ searchPhrase, onChange, onClick, onClose }: Props) => {
  const [clicked, setIsClicked] = useState(false);
  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 10 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search User"
          value={searchPhrase}
          onChangeText={onChange}
          onFocus={() => {
            setIsClicked(true);
          }}
          onSubmitEditing={() => {
            Keyboard.dismiss();
            onClick(searchPhrase);
            setIsClicked(false);
          }}
        />

        <View style={styles.actions}>
          {clicked && (
            <>
              <View style={styles.check}>
                <Entypo
                  name="check"
                  size={20}
                  color="#E1DFDF"
                  style={{ padding: 2 }}
                  onPress={() => {
                    Keyboard.dismiss();
                    onClick(searchPhrase);
                    setIsClicked(false);
                  }}
                />
              </View>
              <View style={styles.close}>
                {/* cross Icon, depending on whether the search bar is clicked or not */}
                <Entypo
                  name="cross"
                  size={20}
                  color="#6f4799"
                  style={{ padding: 1.5 }}
                  onPress={() => {
                    Keyboard.dismiss();
                    onClose();
                    setIsClicked(false);
                  }}
                />
              </View>
            </>
          )}
        </View>
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {/* {clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              setIsClicked(false);
            }}
          ></Button>
        </View>
      )} */}
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    // margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 20,
    width: "70%",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 2,
  },
  check: {
    height: 25,
    width: 25,
    borderRadius: 25,
    backgroundColor: "#31243F",
    alignContent: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  close: {
    height: 25,
    width: 25,
    borderRadius: 25,
    alignContent: "center",
    justifyContent: "center",
    borderColor: "#6f4799",
    borderWidth: 1,
    marginRight: 5,
  },
});
