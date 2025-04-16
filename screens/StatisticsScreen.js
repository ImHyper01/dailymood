import React, { useContext } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import ThemeContext from '../theme/themeContext'; 

const screenWidth = Dimensions.get('window').width;

export default function Stats({ moodData = {} }) {
  const { currentTheme } = useContext(ThemeContext);
  const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#1dd1a1', '#5f27cd'];
  const emotionLabels = ['Blij', 'Normaal', 'Verdrietig', 'Glimlachend', 'Boos'];

  const data = emotionLabels.map((label, index) => ({
    name: label,
    population: moodData[label] || 0,
    color: colors[index],
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.text, { color: currentTheme.color }]}>Stats</Text>
      <PieChart 
      data={data}
      width={screenWidth}
      height={220}
      chartConfig={{
        backgroundColor: '#fff',
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: '#fff',
        color: (opacity = 1 ) => `rgba(0, 0, 0, ${opacity})`,
      }}
      accessor='population'
      backgroundColor='transparent'
      paddingLeft='15'
      absolute
      />
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
