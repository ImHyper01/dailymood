import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import ThemeContext from '../theme/themeContext'; 
import { insertMood } from '../database/database';

export default function Mood() {
  const [selectedEmoji, setSelectedEmoji] = useState(0);
  const { t } = useTranslation();
  const { currentTheme } = useContext(ThemeContext);

  const emojis = [
    { img: require('../assets/emojis/happy-face.png'), label: 'Blij' },
    { img: require('../assets/emojis/confused.png'), label: 'Normaal' },
    { img: require('../assets/emojis/sad.png'), label: 'Verdrietig' },
    { img: require('../assets/emojis/smile.png'), label: 'Glimlachend' },
    { img: require('../assets/emojis/angry.png'), label: 'Boos' },
  ];

  const handleMoodPress = async (mood) => {
    await insertMood(mood);
    alert(`Mood '${mood}' opgeslagen!`);
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.text, { color: currentTheme.color }]}>{t('mood.pickYourMood')}</Text>

      <View style={styles.selectedEmojiContainer}>
        <Image source={emojis[selectedEmoji].img} style={styles.selectedEmoji} />
        <Text style={[styles.selectedEmojiLabel, { color: currentTheme.color }]}>{emojis[selectedEmoji].label}</Text>
      </View>

      <View style={styles.emojiScroll}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageViewContainer}>
          {emojis.map((emoji, index) => (
            <TouchableOpacity
              key={index}
              style={styles.emojiWrapper}
              onPress={() => setSelectedEmoji(index)}
            >
              <Image source={emoji.img} style={styles.emoji} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity 
        style={styles.bevButton} 
        onPress={() => handleMoodPress(emojis[selectedEmoji].label)}
      >
        <Text style={styles.bevButtonText}>{t('mood.confirmButton')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 50,
    textAlign: 'center',
  },
  imageViewContainer: {
    paddingVertical: 50,
  },
  emojiScroll: {
    marginTop: 20,
  },
  emojiWrapper: {
    width: 80,
    height: 100,
    borderWidth: 2,
    borderColor: 'black',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  emoji: {
    width: 50,
    height: 50,
  },
  selectedEmojiContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  selectedEmoji: {
    width: 220,
    height: 220,
  },
  selectedEmojiLabel: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
  },
  bevButton: {
    backgroundColor: '#5F67EA',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  bevButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
