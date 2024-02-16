import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';
import * as Calendar from 'expo-calendar';

const PermissionComponent = () => {
  const requestPermission = async (permissionType) => {
    try {
      let status;

      switch (permissionType) {
        case 'photo':
          status = await ImagePicker.requestMediaLibraryPermissionsAsync();
          break;
        case 'location':
          status = await Location.requestForegroundPermissionsAsync();
          break;
        case 'contacts':
          status = await Contacts.requestPermissionsAsync();
          break;
        case 'calendar':
          status = await Calendar.requestCalendarPermissionsAsync();
          break;
        default:
          Alert.alert('Invalid Permission', 'Invalid permission type.');
          return;
      }

      if (status.status === 'granted') {
        Alert.alert('Permission Granted', `${permissionType} permission granted.`);
      } else {
        Alert.alert('Permission Denied', `${permissionType} permission denied.`);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Grant Permissions</Text>
      <Button title="Grant Photo Library Permission" onPress={() => requestPermission('photo')} />
      <Button title="Grant Location Permission" onPress={() => requestPermission('location')} />
      <Button title="Grant Contacts Permission" onPress={() => requestPermission('contacts')} />
      <Button title="Grant Calendar Permission" onPress={() => requestPermission('calendar')} />
    </View>
  );
};

export default PermissionComponent;
