import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const IconDisplayButton = ({ onIconPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onIconPress}>
        <Icon name="feedback" size={30} color="#900" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconDisplayButton;
