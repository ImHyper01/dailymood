import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ThemeContext from '../theme/themeContext'; // Zorg ervoor dat het pad klopt

export default function Stats() {
  const { currentTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.text, { color: currentTheme.color }]}>Stats</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
