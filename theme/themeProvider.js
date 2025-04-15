import React, { useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeContext from './themeContext';
import theme from './theme';

const THEME_KEY = 'app-theme';

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    (async () => {
      const storedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (storedTheme) {
        setMode(storedTheme);
      } else {
        // gebruik systeemvoorkeur als standaard
        const sysTheme = Appearance.getColorScheme();
        setMode(sysTheme || 'light');
      }
    })();
  }, []);

  const toggleTheme = async () => {
    const newTheme = mode === 'light' ? 'dark' : 'light';
    setMode(newTheme);
    await AsyncStorage.setItem(THEME_KEY, newTheme);
  };

  const currentTheme = theme[mode];

  return (
    <ThemeContext.Provider value={{ mode, currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
