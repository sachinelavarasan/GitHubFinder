import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ViewStyle,
} from "react-native";
import { fetchUsers } from "../../api";
import { AxiosError, AxiosResponse } from "axios";
import styled from "styled-components/native";

import ArrowSvg from "../../assets/icons/arrow-move.svg";
import useTheme from "../../utils/Hooks";

const Card = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.cardBg};
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.cardBg};
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default function SearchScreen({ navigation }: any) {
  const [theme] = useTheme();
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const styles = makeStyles(theme);

  useEffect(() => {
    setLoading(true);
    fetchUsers("sachinela")
      .then(({ data }: AxiosResponse) => {
        setCount(data.total_count);
        setItems(data.items);
      })
      .catch((error: AxiosError) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color={theme.subText} />
        </View>
      ) : (
        <>
          <Text style={[styles.header, { color: theme.primaryText }]}>
            {count.toString().padStart(2, "0")} Results Found
          </Text>
          <ScrollView
            style={styles.cardContainer}
            showsVerticalScrollIndicator={false}
          >
            {items?.map((item: any) => {
              return (
                <Card
                  key={item.node_id}
                  style={styles.shadow}
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate("Details", {
                      username: item?.login,
                    });
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      style={styles.avatarLogo}
                      source={{
                        uri: item?.avatar_url,
                      }}
                    />
                    <View style={{ marginLeft: 14 }}>
                      <Text style={[styles.text, { color: theme.primaryText }]}>
                        {item.login}
                      </Text>
                      <Text style={[styles.subText, { color: theme.subText }]}>
                        {item.html_url}
                      </Text>
                    </View>
                  </View>
                  <ArrowSvg />
                </Card>
              );
            })}
            <View style={{ marginBottom: 30 }}></View>
          </ScrollView>
        </>
      )}
    </View>
  );
}
const makeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    avatarLogo: {
      width: 50,
      height: 50,
      borderRadius: 50,
      resizeMode: "contain",
      borderColor: theme.subText,
      borderWidth: 1,
    },
    cardContainer: {
      flex: 1,
      paddingTop: 20,
    },
    text: {
      fontSize: 16,
      fontStyle: "normal",
      color: theme.primaryText,
      fontFamily: "Inter-Bold",
      textTransform: "capitalize",
    },
    shadow: {
      shadowColor: theme.shadowColor,
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 4,
    },
    subText: {
      color: theme.subText,
      fontSize: 12,
      fontFamily: "Inter-Normal",
    },
    header: {
      fontSize: 18,
      color: theme.primaryText,
      fontFamily: "Inter-Extra",
      textTransform: "capitalize",
    },
  });
