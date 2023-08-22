import { StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';

import { ThemeContext } from '../../../../utils/contexts/ThemeProvider';

import DarkThemeLogo from '../../../../assets/logo/dark-logo.svg';
import LightThemeLogo from '../../../../assets/logo/light-logo.svg';
import { colors } from '../../../../utils/colors';

const Header = ({ title }: { title: string }) => {
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const styles = makeStyles(activeColors);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
          marginBottom: 10
        }}
      >
        <View style={{ marginRight: 4 }}>
          {theme.mode === 'dark' ? <DarkThemeLogo /> : <LightThemeLogo />}
        </View>
      </View>
      <Text style={[styles.header, { color: activeColors.primaryText }]}>
        {title}
      </Text>
    </>
  );
};

const makeStyles = (theme: any) =>
  StyleSheet.create({
    header: {
      fontSize: 16,
      color: theme.primaryText,
      fontFamily: 'Inter-Extra',
      textTransform: 'capitalize',
      paddingBottom: 10
    }
  });

export default Header;
