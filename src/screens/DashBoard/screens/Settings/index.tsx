import { StyleSheet, Switch, Text, View } from 'react-native';
import { useContext } from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { ThemeContext } from '../../../../../utils/contexts/ThemeProvider';
import { colors } from '../../../../../utils/colors';

import DarkThemeIcon from '../../../../../assets/theme/moon.svg';
import LightThemeIcon from '../../../../../assets/theme/sun.svg';
import Header from '../../components/Header';
import { BottomNavigatorParamList } from '..';
import { HomeStackNavigatorParamList } from '../..';

type Props = StackScreenProps<
  HomeStackNavigatorParamList & BottomNavigatorParamList,
  'Settings'
>;

const Settings = ({ route }: Props) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const styles = makeStyles(activeColors);
  return (
    <View style={styles.container}>
      <Header title={route.name} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: activeColors.bCard
        }}
      >
        <Text style={[styles.subheader, { color: activeColors.primaryText }]}>
          Theme
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <View style={{ marginRight: 4 }}>
            {theme.mode === 'dark' ? <DarkThemeIcon /> : <LightThemeIcon />}
          </View>
          <Switch
            trackColor={{ false: '#000', true: '#fff' }}
            thumbColor={theme.mode === 'dark' ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              updateTheme();
            }}
            value={theme.mode === 'dark'}
          />
        </View>
      </View>
    </View>
  );
};

export default Settings;

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
      fontFamily: 'Inter-Extra',
      textTransform: 'capitalize',
      paddingVertical: 10
    },
    subheader: {
      fontSize: 14,
      color: theme.primaryText,
      fontFamily: 'Inter-Medium',
      textTransform: 'capitalize',
      paddingVertical: 8
    }
  });
