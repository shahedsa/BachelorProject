import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';

const ProfilesScreen = (props) => {
  return (
    <View style={styles.centered}>
      <Text>This is profile screen!</Text>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Your Profile',
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navData.navigation.toggleDrawer();
        }}>
        <Image
          source={require('../../assets/open-menu.png')}
          style={{width: 25, height: 20, margin: 20}}
          color={Platform.OS === 'android' ? 'white' : '#572DAF'}
        />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfilesScreen;
