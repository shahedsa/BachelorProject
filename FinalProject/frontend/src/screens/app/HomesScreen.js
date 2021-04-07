import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const HomesScreen = (props) => {
  return (
    <View style={styles.centered}>
      <Text>Home Screen!</Text>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Home',
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
  centered: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default HomesScreen;
