import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import DatePicker from '../components/Date';
import { useTranslation } from 'react-i18next';
import ThemeContext from '../theme/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart } from 'react-native-chart-kit';
import { ProgressBar } from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [loginCount, setLoginCount] = useState(0);
  const [moodData, setMoodData] = useState({});
  const { t } = useTranslation();
  const { currentTheme } = useContext(ThemeContext);

  const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#1dd1a1', '#5f27cd'];
  const emotionLabels = ['Blij', 'Normaal', 'Verdrietig', 'Glimlachend', 'Boos'];

  useEffect(() => {
    const handleLoginCount = async () => {
      const today = new Date().toISOString().split('T')[0];
      const lastLogin = await AsyncStorage.getItem('lastLogin');
      const count = await AsyncStorage.getItem('loginCount');

      if (lastLogin !== today) {
        const newCount = count ? parseInt(count) + 1 : 1;
        await AsyncStorage.setItem('loginCount', newCount.toString());
        await AsyncStorage.setItem('lastLogin', today);
        setLoginCount(newCount);
      } else {
        setLoginCount(count ? parseInt(count) : 1);
      }
    };

    handleLoginCount();

    const loadMoodStats = async () => {
      await fetchMoodStats(setMoodData);
    };
    loadMoodStats();
  }, []);

  const total = Object.values(moodData).reduce((acc, val) => acc + val, 0);

  const pieData = emotionLabels.map((label, index) => {
    const count = moodData[label] || 0;
    const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
    return {
      name: `${label} (${percentage}%)`,
      population: count,
      color: colors[index],
      legendFontColor: '#7F7F7F',
      legendFontSize: 11,
    };
  });

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.text, { color: currentTheme.color }]}>
        {t('home.greeting')}
      </Text>

      {/* Login Counter */}
      <View style={styles.widgetContainer}>
        <Text style={styles.widgetTitle}>
          {t('home.loginDays')}
        </Text>
        <View style={styles.widgetContent}>
          <Text style={styles.widgetDescription}>
            {loginCount === 1 ? t('home.firstLogin') : t('home.keepGoing')}:
          </Text>
          <Text style={styles.widgetCount}>  {loginCount}</Text>
        </View>
      </View>

      {/* Pie Chart as a Widget */}
      <View style={styles.chartContainer}>
        <Text style={[styles.chartTitle, { color: currentTheme.color }]}>
          {t('home.moodStats') || 'Jouw emoties'}
        </Text>
        <View style={styles.pieChartWidget}>
          <PieChart
            data={pieData}
            width={screenWidth - 60}
            height={160}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      </View>

      {/* Horizontale agenda */}
      <View style={styles.bottomAgenda}>
        <Text style={[styles.sectionTitle, { color: currentTheme.color }]}>
          {t('home.selectDate') || 'Kies een datum'}
        </Text>
        <DatePicker
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          horizontal={true}
          customStyle={{
            selectedDateContainer: {
              backgroundColor: '#ff6347',
            },
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  counterContainer: {
    backgroundColor: '#eef2ff',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  counterText: {
    fontSize: 18,
    fontWeight: '600',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pieChartWidget: {
    width: screenWidth - 60, // Verklein de breedte van de grafiek voor meer ruimte
    borderRadius: 15,
    backgroundColor: '#f7f7f7',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  bottomAgenda: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },

  widgetContainer: {
    backgroundColor: '#fffbf0',
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
    width: '80%',
    marginLeft: '10%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  widgetTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4f4f4f',
    marginBottom: 8,
  },
  widgetContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  widgetCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6347',
    marginRight: 8,
  },
  widgetDescription: {
    fontSize: 18,
  },
});