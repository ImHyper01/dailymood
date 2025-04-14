import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/dailymoodlogo.png')}
        style={styles.logo}
      />
      <Image
        source={require('../assets/profile.jpg')}
        style={styles.profile}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 30,
        // backgroundColor: '#4CAF50', // Achtergrondkleur
        flexDirection: 'row', // Zorg ervoor dat de items naast elkaar staan
        justifyContent: 'space-between', // Zorg dat de items aan de uiteinden komen te staan
        alignItems: 'center', // Verticaal centreren
        paddingTop: 20, // Ruimte bovenaan
        paddingHorizontal: 10, // Ruimte aan beide zijden
      },

  logo: {
    width: 130,
    height: 50,
  },

  profile: {
    width: 50, // Breedte van het profielicoon
    height: 50, 
  },

});

export default Header;
