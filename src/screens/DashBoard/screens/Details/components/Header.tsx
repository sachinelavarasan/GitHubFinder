import { useContext, useCallback } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Linking,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../../../../../../utils/colors';
import { ThemeContext } from '../../../../../../utils/contexts/ThemeProvider';

import BackLight from '../../../../../../assets/icons/back-light.svg';
import BackDark from '../../../../../../assets/icons/back-dark.svg';
import GithubDark from '../../../../../../assets/icons/github-dark.svg';
import GithubLight from '../../../../../../assets/icons/github-light.svg';
import WebDark from '../../../../../../assets/icons/web-dark.svg';
import WebLight from '../../../../../../assets/icons/web-light.svg';
import BackButton from '../../../../../components/BackButton';

const windowDimensions = Dimensions.get('window').width - 40;

const Header = ({ user }: any) => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const styles = makeStyles(activeColors);

  const handlePress = useCallback(
    async (url: string) => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    },
    [user]
  );

  return (
    <View style={{ flex: 1, width: windowDimensions }}>
      <View style={styles.headerContainer}>
        <View style={{ width: windowDimensions / 2 }}>
          <BackButton
            onPress={() => {
              navigation.goBack();
            }}
          />
          {user?.name ? <Text style={styles.head}>{user?.name}</Text> : null}
          {user?.blog ? (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginBottom: 4,
                alignItems: 'center'
              }}
              onPress={() => {
                handlePress(user?.blog);
              }}
            >
              {theme.mode === 'dark' ? (
                <WebDark style={{ marginRight: 12 }} />
              ) : (
                <WebLight style={{ marginRight: 12 }} />
              )}

              <Text style={styles.sub}>{user?.blog}</Text>
            </TouchableOpacity>
          ) : null}
          {user?.html_url ? (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginVertical: 4,
                alignItems: 'center'
              }}
              onPress={() => {
                handlePress(user?.html_url);
              }}
            >
              {theme.mode === 'dark' ? (
                <GithubDark style={{ marginRight: 12 }} />
              ) : (
                <GithubLight style={{ marginRight: 12 }} />
              )}

              <Text style={styles.sub}>{user?.html_url}</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <Image
          style={styles.avatarLogo}
          source={{
            uri: user?.avatar_url
          }}
        />
      </View>

      <View style={{ flexDirection: 'column', marginTop: 10 }}>
        <Text style={styles.bio}>BIO</Text>
        {user?.bio ? <Text style={styles.bioText}>{user?.bio}</Text> : null}
      </View>
    </View>
  );
};

export default Header;

const makeStyles = (theme: {
  subText: string;
  primaryText: string;
  bio: string;
  back: string;
}) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: windowDimensions
    },
    avatarLogo: {
      width: windowDimensions / 3,
      height: windowDimensions / 3,
      borderRadius: windowDimensions / 3,
      resizeMode: 'contain',
      borderColor: theme.subText,
      borderWidth: 1
    },
    head: {
      color: theme.primaryText,
      fontSize: 24,
      fontFamily: 'Inter-Extra',
      marginBottom: 10
    },
    sub: {
      color: theme.subText,
      fontSize: 14,
      fontFamily: 'Inter-Medium'
    },
    bio: {
      color: theme.primaryText,
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      padding: 10,
      backgroundColor: theme.bio,
      textAlign: 'center'
    },
    bioText: {
      color: theme.subText,
      fontSize: 16,
      fontFamily: 'Inter-Semibold',
      textAlign: 'center',
      marginTop: 10
    },
    back: {
      color: theme.back,
      fontSize: 12,
      fontFamily: 'Inter-Medium'
    }
  });
