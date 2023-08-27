import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import { useContext } from "react";

import { ThemeContext } from "../../../../../../utils/contexts/ThemeProvider";
import { colors } from "../../../../../../utils/colors";
import { UserProps } from "../../../../../../utils/types";

const windowDimensions = Dimensions.get("window").width - 40;

function padTo2Digits(num: Number) {
  return num.toString().padStart(2, "0");
}

function formatDate(date: Date) {
  let monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return [
    padTo2Digits(date.getDate()),
    monthList[date.getMonth()],
    date.getFullYear()
  ].join(" ");
}

const Main = ({ user }: UserProps) => {
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const styles = makeStyles(activeColors);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.card} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: activeColors.bCard,
            borderBottomWidth: 1
          }}
        >
          <Text style={styles.col}>Login</Text>
          <Text style={styles.cell}>{user?.login}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: activeColors.bCard,
            borderBottomWidth: 1
          }}
        >
          <Text style={styles.col}>Account Created</Text>
          <Text style={styles.cell}>
            {formatDate(new Date(user?.created_at)) || "-"}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: activeColors.bCard,
            borderBottomWidth: 1
          }}
        >
          <Text style={styles.col}>Location</Text>
          <Text style={styles.cell}>{user?.location || "-"}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: activeColors.bCard,
            borderBottomWidth: 1
          }}
        >
          <Text style={styles.col}>Follower’s</Text>
          <Text style={styles.cell}>{user?.followers || "-"}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: activeColors.bCard,
            borderBottomWidth: 1
          }}
        >
          <Text style={styles.col}>Following’s</Text>
          <Text style={styles.cell}>{user?.following || "-"}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: activeColors.bCard,
            borderBottomWidth: 1
          }}
        >
          <Text style={styles.col}>Company Name</Text>
          <Text style={styles.cell}>{user?.company || "-"}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: activeColors.bCard,
            borderBottomWidth: 1
          }}
        >
          <Text style={styles.col}>Type</Text>
          <Text style={styles.cell}>{user?.type || "-"}</Text>
        </View>
        <View
          style={{
            flexDirection: "row"
          }}
        >
          <Text style={styles.col}>Public Repo’</Text>
          <Text style={styles.cell}>{user?.public_repos || "-"}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Main;

const makeStyles = (theme: {
  dCard: string;
  shadowColor: string;
  primaryText: string;
  subText: string;
}) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.dCard,
      borderRadius: 15,
      shadowColor: theme.shadowColor,
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: -4,
      marginTop: 20
    },
    col: {
      width: windowDimensions / 2,
      textAlign: "right",
      paddingVertical: 10,
      paddingHorizontal: 12,
      color: theme.primaryText,
      fontSize: 14,
      fontFamily: "Inter-Medium"
    },
    cell: {
      width: windowDimensions / 2,
      paddingVertical: 10,
      paddingHorizontal: 12,
      color: theme.subText,
      fontSize: 14,
      fontFamily: "Inter-Medium"
    }
  });
