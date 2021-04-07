import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import {Platform, SafeAreaView, Button, View, Image} from 'react-native';

import {useDispatch} from 'react-redux';

import HomesScreen, {
  screenOptions as homeScreenOptions,
} from '../screens/app/HomesScreen';
import ProfilesScreen, {
  screenOptions as profilesScreenOptions,
} from '../screens/app/ProfilesScreen';
import EntrancesScreen, {
  screenOptions as entrancesScreenOptions,
} from '../screens/app/EntrancesScreen';

import AuthScreen, {
  screenOptions as authScreenOptions,
} from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';

import * as authActions from '../store/actions/auth';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? '#572DAF' : '',
  },

  headerTintColor: Platform.OS === 'android' ? 'black' : '#572DAF',
  headerTitleStyle: {
    fontWeight: 'bold',
    margin: 20,
  },
  headerTitleAlign: 'center',
};

const HomesStackNavigator = createStackNavigator();

export const HomesNavigator = () => {
  return (
    <HomesStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <HomesStackNavigator.Screen
        name="HomeDisplay"
        component={HomesScreen}
        options={homeScreenOptions}
      />
    </HomesStackNavigator.Navigator>
  );
};

const ProfilesStackNavigator = createStackNavigator();

export const ProfilesNavigator = () => {
  return (
    <ProfilesStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProfilesStackNavigator.Screen
        name="Profile"
        component={ProfilesScreen}
        options={profilesScreenOptions}
      />
    </ProfilesStackNavigator.Navigator>
  );
};

const EntranceStackNavigator = createStackNavigator();

export const EntranceNavigator = () => {
  return (
    <EntranceStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <EntranceStackNavigator.Screen
        name="Entrance"
        component={EntrancesScreen}
        options={entrancesScreenOptions}
      />
    </EntranceStackNavigator.Navigator>
  );
};

const DrawerNavigator = createDrawerNavigator();

export const ScreensNavigator = () => {
  const dispatch = useDispatch();

  return (
    <DrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={'#572DAF'}
                onPress={() => {
                  dispatch(authActions.logout());
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: '#572DAF',
      }}>
      <DrawerNavigator.Screen
        name="Home"
        component={HomesNavigator}
        options={{
          drawerIcon: () => (
            <Image
              source={require('../assets/home.png')}
              style={{width: 25, height: 20}}
            />
          ),
        }}
      />
      <DrawerNavigator.Screen
        name="Profile"
        component={ProfilesNavigator}
        options={{
          drawerIcon: () => (
            <Image
              source={require('../assets/user.png')}
              style={{width: 25, height: 20}}
            />
          ),
        }}
      />
      <DrawerNavigator.Screen
        name="Entrance"
        component={EntranceNavigator}
        options={{
          drawerIcon: () => (
            <Image
              source={require('../assets/entrance.png')}
              style={{width: 25, height: 20}}
            />
          ),
        }}
      />
    </DrawerNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Authentication"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
