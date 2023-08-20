import { useEffect, useMemo, useState, useContext } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  FlatList
} from 'react-native';
import { AxiosError, AxiosResponse } from 'axios';
import { StackScreenProps } from '@react-navigation/stack';

import { fetchUsers } from '../../../../api/gitApi';
import { SearchBar } from '../../../../components';
import { ThemeContext } from '../../../../../utils/contexts/ThemeProvider';
import { colors } from '../../../../../utils/colors';

import ArrowSvg from '../../../../../assets/icons/arrow-move.svg';

import { BottomNavigatorParamList } from '..';
import { HomeStackNavigatorParamList } from '../..';
import Header from '../../components/Header';

type Props = StackScreenProps<
  HomeStackNavigatorParamList & BottomNavigatorParamList,
  'Search'
>;

export default function SearchScreen({ navigation, route }: Props) {
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const styles = makeStyles(activeColors);

  const [count, setCount] = useState(0);
  const [results, setResults] = useState('');
  const [items, setItems] = useState<any>([]);
  const [currentItems, setCurrentItems] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');

  const uniqueItems = useMemo(() => {
    let newElements = currentItems.filter((element: any) => {
      const findId = items.find(
        (data: any) => data.node_id === element.node_id
      );

      if (!findId) {
        return element;
      }
      return false;
    });
    setItems(() => [...items, ...newElements]);
    return [...items, ...newElements];
  }, [currentItems]);

  const fetchUserList = (page: number, searchPhrase: string) => {
    if (searchPhrase.trim().length) {
      setLoading(true);
      fetchUsers({ q: searchPhrase.trim(), page: page })
        .then(({ data }: AxiosResponse) => {
          setCount(data.total_count);
          setCurrentItems(data.items);
          setResults(
            data.total_count
              ? `${data.total_count.toString().padStart(2)} users found`
              : 'No results found'
          );
        })
        .catch((error: AxiosError) => {
          Alert.alert(JSON.stringify(error.response?.data));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const resetState = () => {
    setCurrentItems([]);
    setResults('');
    setItems([]);
    setPage(1);
    setCount(0);
  };

  useEffect(() => {
    if (page > 1) fetchUserList(page, searchPhrase);
  }, [page]);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        key={item.login}
        style={[styles.card, styles.shadow]}
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Details', {
            username: item?.login
          });
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={styles.avatarLogo}
            source={{
              uri: item?.avatar_url
            }}
          />
          <View style={{ marginLeft: 14 }}>
            <Text style={[styles.text, { color: activeColors.primaryText }]}>
              {item.login}
            </Text>
            <Text style={[styles.subText, { color: activeColors.subText }]}>
              {item.html_url}
            </Text>
          </View>
        </View>
        <ArrowSvg />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={route.name} />
      <View>
        <SearchBar
          searchPhrase={searchPhrase}
          onChange={(e: any) => {
            setSearchPhrase(e);
          }}
          onClick={(searchPhrase: string) => {
            resetState();
            fetchUserList(1, searchPhrase);
          }}
          onClose={() => {
            setSearchPhrase('');
            resetState();
          }}
        />
      </View>
      <Text style={[styles.header, { color: activeColors.primaryText }]}>
        {searchPhrase.trim() ? results : ''}
      </Text>
      <FlatList
        style={styles.cardContainer}
        showsVerticalScrollIndicator={false}
        data={uniqueItems}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.node_id}
        ListFooterComponent={
          loading ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ActivityIndicator size="large" color={activeColors.subText} />
            </View>
          ) : uniqueItems.length && count - page * 30 > 0 ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (!loading) {
                    setPage((state) => state + 1);
                  }
                }}
                style={{
                  borderColor: activeColors.subText,
                  borderWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 7,
                  backgroundColor: activeColors.subText,
                  opacity: 0.8,
                  borderRadius: 5,
                  paddingHorizontal: 15,
                  paddingBottom: 10
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    textAlignVertical: 'center',
                    fontSize: 14
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
      paddingVertical: 20
    },
    avatarLogo: {
      width: 50,
      height: 50,
      borderRadius: 50,
      resizeMode: 'contain',
      borderColor: theme.subText,
      borderWidth: 1
    },
    cardContainer: {
      flex: 1
    },
    text: {
      fontSize: 16,
      fontStyle: 'normal',
      color: theme.primaryText,
      fontFamily: 'Inter-Bold',
      textTransform: 'capitalize'
    },
    card: {
      backgroundColor: theme.cardBg,
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.cardBg,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    shadow: {
      shadowColor: theme.shadowColor,
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 4
    },
    subText: {
      color: theme.subText,
      fontSize: 12,
      fontFamily: 'Inter-Normal'
    },
    header: {
      fontSize: 14,
      color: theme.primaryText,
      fontFamily: 'Inter-Extra',
      textTransform: 'capitalize',
      paddingVertical: 10
    }
  });
