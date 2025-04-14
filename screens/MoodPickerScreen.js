import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function Mood() {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const emojis = [
    require('../assets/emojis/happy-face.png'),
    require('../assets/emojis/smile.png'),
    require('../assets/emojis/confused.png'),
    require('../assets/emojis/sad.png'),
    require('../assets/emojis/angry.png'),
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Kies je stemming vandaag</Text>

      {/* Vergrote emoji */}
      {selectedEmoji !== null && (
        <View style={styles.selectedEmojiContainer}>
          <Image source={emojis[selectedEmoji]} style={styles.selectedEmoji} />
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
              <Image source={emoji} style={styles.emoji} />
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
    width: 120,
    height: 120,
  },
  bevButton: {
    backgroundColor: '#5F67EA',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 40,
  },
  bevButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
