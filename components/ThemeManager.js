import React, { createContext, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Define the themes
const themes = {
  light: {
    backgroundColor: '#FFFFFF',
    textColor: '#333333',
  },
  dark: {
    backgroundColor: '#333333',
    textColor: '#FFFFFF',
  },
};

// Create a context for the theme
const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default theme

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[theme], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Use this hook to access the theme in any functional component
export const useTheme = () => useContext(ThemeContext);

// Example component that uses the theme
export const ThemedComponent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={{ color: theme.textColor }}>This is a themed component.</Text>
      <TouchableOpacity onPress={toggleTheme} style={styles.button}>
        <Text>Toggle Theme</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});
