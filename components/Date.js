// components/Date.js

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import dayjs from 'dayjs';

export default function DatePicker({ onDateSelect, selectedDate, customStyle = {} }) {
  const [dates, setDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(dayjs().format('DD-MM-YYYY')); // Huidige datum in DD-MM-YYYY
  const flatListRef = useRef();

  useEffect(() => {
    const generateDates = () => {
      const today = dayjs();
      const startDate = today.subtract(30, 'day'); // 30 dagen terug
      const endDate = today.add(30, 'day'); // 30 dagen vooruit
      const tempDates = [];

      for (let d = startDate; d.isBefore(endDate); d = d.add(1, 'day')) {
        tempDates.push(d);
      }

      setDates(tempDates);
    };

    generateDates();
  }, []);

  const renderItem = ({ item }) => {
    const dateStr = item.format('DD-MM-YYYY'); // Zet datum naar DD-MM-YYYY
    const isSelected = selectedDate === dateStr;
    const isToday = currentDate === dateStr; // Huidige dag checken

    return (
      <TouchableOpacity
        onPress={() => onDateSelect(dateStr)}
        style={[
          styles.dateContainer,
          isSelected && styles.selectedDate,
          isSelected && customStyle.selectedDateContainer,
          isToday && styles.todayDate, // Specifieke stijl voor de huidige dag
        ]}
      >
        <Text style={[styles.dayText, isSelected && styles.selectedDayText, isToday && styles.todayDayText]}>
          {item.format('dd')} {/* Abbreviatie van de weekdag */}
        </Text>
        <Text style={[styles.dateText, isSelected && styles.selectedDateText, isToday && styles.todayDateText]}>
          {item.format('D')} {/* Dag van de maand */}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={dates}
        keyExtractor={(item) => item.format('DD-MM-YYYY')} // Verander naar DD-MM-YYYY
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={30} // Zet vandaag in het midden
        getItemLayout={(data, index) => ({
          length: 60,
          offset: 60 * index,
          index,
        })}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    paddingVertical: 10,
  },
  dateContainer: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 10,
    marginHorizontal: 4,
    backgroundColor: "#5F67EA"
  },
  selectedDate: {
    backgroundColor: '#00adf5',
  },
  todayDate: {
    backgroundColor: '#ffcc00', // Aparte kleur voor de huidige dag
  },
  dayText: {
    fontSize: 12,
    color: 'white',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  selectedDayText: {
    color: '#fff',
  },
  selectedDateText: {
    color: '#fff',
  },
  todayDayText: {
    color: '#fff', // Kleur van de tekst op de huidige dag
  },
  todayDateText: {
    color: '#fff', // Kleur van de datum op de huidige dag
  },
});
