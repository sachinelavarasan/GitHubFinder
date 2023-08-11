import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { darkTheme } from "../../utils/colors";
import Github from "../../assets/icons/github.svg";
import Web from "../../assets/icons/web.svg";
import useTheme from "../../utils/Hooks";

const windowDimensions = Dimensions.get("window").width;

const Header = ({ user }: any) => {
  const [theme] = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.entire}>
      <View style={[styles.top]}>
        <View style={styles.headerContainer}>
          <Text style={styles.head}>{user?.name}</Text>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 4,
              alignItems: "center",
            }}
          >
            <Github style={{ marginRight: 12 }} />
            <Text style={styles.sub}>{user?.url}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Web style={{ marginRight: 12 }} />
            <Text style={styles.sub}>{user?.blog}</Text>
          </View>
        </View>
        <View>
          <Image
            style={styles.avatarLogo}
            source={{
              uri: user?.avatar_url,
            }}
          />
        </View>
      </View>
      <View style={{ flexDirection: "column", marginVertical: 20 }}>
        <Text style={styles.bio}>BIO</Text>
        <Text style={styles.bioText}>{user?.bio}</Text>
      </View>
    </View>
  );
};

export default Header;

const makeStyles = (theme: {
  subText: string;
  primaryText: string;
  bio: string;
}) =>
  StyleSheet.create({
    entire: {
      flexDirection: "column",
    },
    top: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerContainer: {
      width: windowDimensions / 2,
    },
    avatarLogo: {
      width: windowDimensions / 3,
      height: windowDimensions / 3,
      borderRadius: windowDimensions / 3,
      resizeMode: "contain",
      borderColor: theme.subText,
      borderWidth: 1,
    },
    head: {
      color: theme.primaryText,
      fontSize: 24,
      fontFamily: "Inter-Extra",
      marginBottom: 10,
    },
    sub: {
      color: theme.subText,
      fontSize: 14,
      fontFamily: "Inter-Medium",
    },
    bio: {
      color: theme.primaryText,
      fontSize: 18,
      fontFamily: "Inter-Bold",
      padding: 10,
      backgroundColor: theme.bio,
      textAlign: "center",
    },
    bioText: {
      color: theme.subText,
      fontSize: 16,
      fontFamily: "Inter-Semibold",
      textAlign: "center",
      marginTop: 10,
    },
  });
