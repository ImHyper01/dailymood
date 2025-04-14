import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DatePicker from '../components/Date'; // Zorg ervoor dat het pad klopt

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hoe voel jij je vandaag?!</Text>

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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50,
    textAlign: 'center',
  },
});
