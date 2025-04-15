import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '../Taal/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Setting() {
  const { t } = useTranslation();
  const [isDutch, setIsDutch] = useState(i18n.language === 'nl');
  const LANG_STORAGE_KEY = 'user-language';

  const toggleSwitch = async () => {
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
    <View style={styles.container}>
      <Text style={styles.title}>{t('settings.title')}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>
          {isDutch ? 'Nederlands' : 'English'}
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#5F67EA' }}
          thumbColor={isDutch ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isDutch}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
  label: {
    fontSize: 18,
  },
});
