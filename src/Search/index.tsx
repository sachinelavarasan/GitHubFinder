import { useEffect, useMemo, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  VirtualizedList,
  TouchableOpacity,
} from "react-native";
import { AxiosError, AxiosResponse } from "axios";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { fetchUsers } from "../../api";

import ArrowSvg from "../../assets/icons/arrow-move.svg";

import useTheme from "../../utils/Hooks";

import SearchBar from "../../common/SearchBar";

import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Search">;

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

export default function SearchScreen({ navigation }: Props) {
  const [theme] = useTheme();
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<any>([]);
  const [currentItems, setCurrentItems] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");

  const styles = makeStyles(theme);
  const uniqueItems = useMemo(() => {
    return currentItems.filter((element: any) => {
      const findId = items.find(
        (data: any) => data.node_id === element.node_id
      );

      if (!findId) {
        return element;
      }
      return false;
    });
  }, [currentItems]);
  const fetchUserList = (page: number, searchPhrase: string) => {
    setLoading(true);
    fetchUsers({ q: searchPhrase, page: page })
      .then(({ data }: AxiosResponse) => {
        setCount(data.total_count);
        setCurrentItems(data.items);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (page > 1) fetchUserList(page, searchPhrase);
  }, [page]);

  return (
    <View style={styles.container}>
      <View>
        <SearchBar
          searchPhrase={searchPhrase}
          onChange={(e: any) => {
            setSearchPhrase(e);
          }}
          onClick={(searchPhrase: string) => {
            setPage(1);
            setItems([]);
            fetchUserList(1, searchPhrase);
          }}
          onClose={() => {
            setSearchPhrase("");
            setItems([]);
            setPage(1);
            setCount(0);
          }}
        />
      </View>
      <Text style={[styles.header, { color: theme.primaryText }]}>
        {count.toString().padStart(2, "0")} Results Found
      </Text>
      <View></View>
      <VirtualizedList
        style={styles.cardContainer}
        showsVerticalScrollIndicator={false}
        data={uniqueItems}
        renderItem={({ item }) => {
          return (
            <Card
              key={item.login}
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
        }}
        keyExtractor={(item: any) => item.node_id}
        getItemCount={() => {
          return uniqueItems.length;
        }}
        getItem={(data: any, index: number) => data[index]}
        ListFooterComponent={
          loading ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size="large" color={theme.subText} />
            </View>
          ) : uniqueItems.length ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (!loading) {
                    setPage((state) => state + 1);
                  }
                }}
                style={{
                  borderColor: theme.subText,
                  borderWidth: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 7,
                  backgroundColor: theme.subText,
                  opacity: 0.8,
                  borderRadius: 5,
                  paddingHorizontal: 15,
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlignVertical: "center",
                    fontSize: 14,
                  }}
                >
                  Load More
                </Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
        // onEndReached={() => {
        //   console.log("enddd");
        //   if (!loading) {
        //     setPage((state) => state + 1);
        //   }
        // }}
        // onEndReachedThreshold={1}
        // onTouchMove={}

        // onTouchMove={() => {
        //   console.log("enddd");

        // }}
      />
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
      paddingBottom: 20,
      marginTop: 20,
    },
  });
