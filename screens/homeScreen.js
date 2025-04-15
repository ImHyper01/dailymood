import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DatePicker from '../components/Date';
import { useTranslation } from 'react-i18next';
import ThemeContext from '../theme/themeContext'; // Zorg ervoor dat het pad klopt

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(null);
  const { t } = useTranslation();
  const { currentTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.text, { color: currentTheme.color }]}>{t('home.greeting')}</Text>

      <DatePicker
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        customStyle={{
          selectedDateContainer: {
            backgroundColor: '#ff6347',
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50,
    textAlign: 'center',
  },
});
