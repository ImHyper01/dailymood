import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import ThemeContext from '../theme/themeContext';
import { Calendar } from 'react-native-calendars';
import { 
  fetchMoodStats, 
  fetchMoodStatsByDate, 
  fetchMoodStatsForWeek, 
  fetchMoodStatsForMonth 
} from '../database/database'; 

const screenWidth = Dimensions.get('window').width;

export default function Stats() {
  const { currentTheme } = useContext(ThemeContext);
  const [moodData, setMoodData] = useState({});
  const [selectedDate, setSelectedDate] = useState('');

  const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#1dd1a1', '#5f27cd'];
  const emotionLabels = ['Blij', 'Normaal', 'Verdrietig', 'Glimlachend', 'Boos'];

  useEffect(() => {
    const loadMoodStats = async () => {
      await fetchMoodStats(setMoodData);
    };
    loadMoodStats();
  }, []);

  const getMoodStatsForDate = async (date) => {
    setSelectedDate(date.dateString);
    await fetchMoodStatsByDate(date.dateString, (data) => {
      setMoodData(data);
    });
  };

  const getWeeklyStats = async () => {
    await fetchMoodStatsForWeek((data) => {
      setMoodData(data);
    });
  };

  const getMonthlyStats = async () => {
    await fetchMoodStatsForMonth((data) => {
      setMoodData(data);
    });
  };

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

      <View style={styles.calendarContainer}>
        <Calendar
          markedDates={{ [selectedDate]: { selected: true, selectedColor: '#5F67EA', selectedTextColor: 'white' } }}
          onDayPress={getMoodStatsForDate}
          monthFormat={'MM yyyy'}
          theme={{
            todayTextColor: '#5F67EA',
            selectedDayBackgroundColor: '#5F67EA',
            selectedDayTextColor: 'white',
            arrowColor: '#5F67EA',
            monthTextColor: currentTheme.color,
            textMonthFontWeight: 'bold',
            textDayHeaderFontSize: 12,
            textDayFontSize: 14,
            textDayFontWeight: 'bold',
          }}
          style={styles.calendar}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Text onPress={getWeeklyStats} style={styles.button}>Show Weekly Stats</Text>
        <Text onPress={getMonthlyStats} style={styles.button}>Show Monthly Stats</Text>
      </View>

      <PieChart 
        data={data}
        width={screenWidth - 40}
        height={200}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  calendarContainer: {
    width: '100%',
    marginBottom: 20,
  },
  calendar: {
    height: 250,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    color: '#5F67EA',
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    padding: 8,
  },
});
