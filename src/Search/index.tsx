import { useEffect, useMemo, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  VirtualizedList,
  TouchableOpacity,
  Switch,
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

export default function SearchScreen({ navigation }: Props) {
  const [theme, isDark, setThemes] = useTheme();
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
    if (searchPhrase.trim().length) {
      setLoading(true);
      fetchUsers({ q: searchPhrase.trim(), page: page })
        .then(({ data }: AxiosResponse) => {
          setCount(data.total_count);
          setCurrentItems(data.items);
        })
        .catch((error: AxiosError) => {
          console.log(error.response?.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (page > 1) fetchUserList(page, searchPhrase);
  }, [page]);

  console.log(isDark, theme);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "flex-end",
          backgroundColor: theme.cardBg,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 20,
          marginBottom: 10,
          borderRadius: 10,
        }}
      >
        <Text
          style={[
            styles.header,
            { color: theme.primaryText, paddingBottom: 0, marginTop: 0 },
          ]}
        >
          Theme
        </Text>
        <Switch
          trackColor={{ false: "#000", true: "#fff" }}
          thumbColor={isDark ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setThemes(!isDark)}
          value={isDark}
        />
      </View>
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
            <TouchableOpacity
              key={item.login}
              style={[styles.card, styles.shadow]}
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
            </TouchableOpacity>
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
          ) : uniqueItems.length && count - page * 30 > 0 ? (
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
    card: {
      backgroundColor: theme.cardBg,
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.cardBg,
      marginBottom: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
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
