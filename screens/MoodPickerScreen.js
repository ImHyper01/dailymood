import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function Mood() {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const emojis = [
    { img: require('../assets/emojis/happy-face.png'), label: 'Happy' },
    { img: require('../assets/emojis/smile.png'), label: 'Smiling' },
    { img: require('../assets/emojis/confused.png'), label: 'Normal' },
    { img: require('../assets/emojis/sad.png'), label: 'Sad' },
    { img: require('../assets/emojis/angry.png'), label: 'Angry' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Kies je stemming vandaag</Text>

      {/* Vergrote emoji + tekst */}
      {selectedEmoji !== null && (
        <View style={styles.selectedEmojiContainer}>
          <Image source={emojis[selectedEmoji].img} style={styles.selectedEmoji} />
          <Text style={styles.selectedEmojiLabel}>{emojis[selectedEmoji].label}</Text>
        </View>
      )}

      <View style={styles.emojiScroll}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.imageViewContainer}
        >
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

      {/* Bevestig button */}
      <TouchableOpacity style={styles.bevButton} onPress={() => alert("Mood bevestigd!")}>
        <Text style={styles.bevButtonText}>Bevestig je mood!</Text>
      </TouchableOpacity>
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
    color: '#333',
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
