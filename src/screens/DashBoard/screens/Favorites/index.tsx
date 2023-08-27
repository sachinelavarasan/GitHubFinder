import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { StackScreenProps } from "@react-navigation/stack";

import { ThemeContext } from "../../../../../utils/contexts/ThemeProvider";
import { colors } from "../../../../../utils/colors";
import { BottomNavigatorParamList } from "..";
import { HomeStackNavigatorParamList } from "../..";
import Header from "../../components/Header";

type Props = StackScreenProps<
  HomeStackNavigatorParamList & BottomNavigatorParamList,
  "Favorites"
>;

const Favorites = ({ route }: Props) => {
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const styles = makeStyles(activeColors);
  return (
    <View style={styles.container}>
      <Header title={route.name} />
    </View>
  );
};

export default Favorites;

const makeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      paddingHorizontal: 20,
      paddingVertical: 20
    },
    header: {
      fontSize: 16,
      color: theme.primaryText,
      fontFamily: "Inter-Extra",
      textTransform: "capitalize",
      paddingVertical: 10
    }
  });
