import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackNavigatorParamList } from "../..";
import Header from "../../components/Header";
import { ThemeContext } from "../../../../../utils/contexts/ThemeProvider";
import { colors } from "../../../../../utils/colors";
import { BackButton } from "../../../../components";
import { getSearchData } from "../../../../../utils/asyncStorage";

type Props = StackScreenProps<HomeStackNavigatorParamList, "SearchHistory">;

const SearchHistory = ({ navigation }: Props) => {
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const styles = makeStyles(activeColors);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getSearchData()
      .then((data) => {
        setHistory(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <BackButton
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Header title="Search History" />
      <FlatList
        style={styles.card}
        data={history}
        renderItem={({ item }: any) => {
          return (
            <View style={styles.item}>
              <Text style={styles.title}>{item}</Text>
            </View>
          );
        }}
        keyExtractor={(item: any, index: number) => item + index}
      />
    </View>
  );
};

export default SearchHistory;

const makeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      paddingHorizontal: 20,
      paddingBottom: 20
    },
    card: {
      backgroundColor: theme.dCard,
      borderRadius: 15,
      shadowColor: theme.shadowColor,
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: -4,
      paddingHorizontal: 20
    },
    item: {
      paddingVertical: 8
    },
    title: {
      fontSize: 16,
      color: theme.primaryText,
      fontFamily: "Inter-Medium"
    }
  });
