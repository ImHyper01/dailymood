import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '../Taal/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeContext from '../theme/themeContext'; // Zorg ervoor dat het pad klopt

export default function Setting() {
  const { t } = useTranslation();
  const { mode, toggleTheme, currentTheme } = useContext(ThemeContext);
  const [isDutch, setIsDutch] = useState(i18n.language === 'nl');
  const LANG_STORAGE_KEY = 'user-language';

  const toggleLanguage = async () => {
    const newLang = isDutch ? 'en' : 'nl';
    try {
      await i18n.changeLanguage(newLang);
      await AsyncStorage.setItem(LANG_STORAGE_KEY, newLang);
      setIsDutch(!isDutch);
    } catch (error) {
      console.error('Failed to switch language', error);
    }
  };

  useEffect(() => {
    // Update state if language changes outside this screen
    setIsDutch(i18n.language === 'nl');
  }, [i18n.language]);

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.title, { color: currentTheme.color }]}>{t('settings.title')}</Text>

      {/* Taal toggle */}
      <View style={styles.row}>
        <Text style={[styles.label, { color: currentTheme.color }]}>
          {isDutch ? 'Nederlands' : 'English'}
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#5F67EA' }}
          thumbColor={isDutch ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleLanguage}
          value={isDutch}
        />
      </View>

      {/* Dark/Light mode toggle */}
      <View style={styles.row}>
        <Text style={[styles.label, { color: currentTheme.color }]}>
          {mode === 'light' ? 'Light Mode' : 'Dark Mode'}
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={mode === 'dark' ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={mode === 'dark'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 32,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 10,
  },
  label: {
    fontSize: 18,
  },
});
