import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
  DeviceEventEmitter,
  NativeEventEmitter,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Divider} from 'react-native-elements';

import axios from 'axios';
import Kontakt, {KontaktModule} from 'react-native-kontaktio';
const {connect, init, startDiscovery, startScanning} = Kontakt;

const kontaktEmitter = new NativeEventEmitter(KontaktModule);

const isAndroid = Platform.OS === 'android';

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
        />
      </TouchableOpacity>
    ),
  };
};

export default class EntrancesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doorName: null,
      Asset: null,
      beaconsList: [],
    };
  }
  /**
   * Denne metoden for spørre om man gir appen tillatelse
   * om posisjonen
   * kilde til denne metoden fra minimal exampel fra:
   * https://github.com/Driversnote-Dev/react-native-kontaktio
   */
  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs to access your location in order to use bluetooth beacons.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        // permission denied
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };
  /**
   * @param {*} id
   * Denne metoden kalles for å hente dør navnet til oppdaget beacon id
   * ved å sende http-forespørsel ved å bruke endepuktet i serveren
   */
  getDoorNameById = (id) => {
    const url = 'http://10.0.2.2:3000/Beacons/' + id;
    var self = this;
    axios
      .get(url)
      .then(function (response) {
        self.setState({doorName: response.data[0].doorName});
        console.log('res from ' + url, response.data);
      })
      .catch(function (response) {
        console.log('Failed', response);
      });
  };
  /**
   * Denne metoden oppdager beacon virtuelt pga.serveren hostes bare
   * på pc og ikke på moblien.
   * Denne metoden man trenger ikke etter at serveren hostes på mobil
   * Denne metoden ble laget kun for testing
   */
  virtuelDetectBeacon = () => {
    const beacons = [{uniqueId: 'Au9Z'}];
    this.setState({beaconsList: this.state.beaconsList.concat(beacons)});
    for (let i = 0; i < beacons.length; i++) {
      console.log('beacon id', beacons[i].uniqueId);
      this.getDoorNameById(beacons[i].uniqueId);
    }
  };
  /**
   * beaconSetup metoden er kommentert foreløpig, en del av strukturen i
   * denne metoden hentet fra :https://github.com/Driversnote-Dev/react-native-kontaktio
   * Det er denne metoden som fanger opp beacons, sette beacon id-ene i en
   * liste, også kaller metoden getDoorNameById for å finne hvilke id har en registret
   * dør navn
   */
  beaconSetup = async () => {
    this.virtuelDetectBeacon();
    // if (isAndroid) {
    //   // Android
    //   const granted = await this.requestLocationPermission();
    //   if (granted) {
    //     await connect();
    //     await startScanning();
    //   } else {
    //     Alert.alert(
    //       'Permission error',
    //       'Location permission not granted. Cannot scan for beacons',
    //       [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    //       {cancelable: false},
    //     );
    //   }
    // } else {
    //   // iOS
    //   await init();
    //   await startDiscovery();
    // }
    // // Add beacon listener
    // if (isAndroid) {
    //   DeviceEventEmitter.addListener(
    //     'beaconsDidUpdate',
    //     ({beacons, region}) => {
    //       //console.log('beaconsDidUpdate', beacons, region);
    //       for (let i = 0; i < beacons.length; i++) {
    //         console.log([beacons[i].uniqueId]);
    //         //const isRegistered = this.getDoorNameById(beacons[i].uniqueId);
    //         //console.log(isRegistered);
    //         const isRegistered = true;
    //         if (isRegistered) {
    //           //TODO : isRegistered
    //           console.log('beacon exist');
    //         } else {
    //           console.log('beacon not exist');
    //         }
    //       }
    //       this.setState({Asset: beacons});
    //       // alert(beacons);
    //       // alert(JSON.stringify(beacons));
    //     },
    //   );
    // } else {
    //   kontaktEmitter.addListener('didDiscoverDevices', ({beacons}) => {
    //     console.log('didDiscoverDevices', beacons);
    //   });
    // }
  };
  // componentDidMount() {
  //   this.beaconSetup();
  //   //this.isRegistered('Au9Z');
  // }
  /**
   *
   * @param {*} doorName
   * Denne metoden sender http-request til sodvinsystemer sin server for å åpne døra.
   */
  openDoor(doorName) {
    console.log('opening door: ', doorName);

    const url =
      'https://xaktapi.sodvinsystemer.no/v1/AccessControlArx/OpenDoor/' +
      doorName;
    console.log('sending HTTP GET request to ' + url);

    axios
      .get(url)
      .then(function (response) {
        console.log('open door api respose ', response.status);
      })
      .catch(function (error) {
        console.log('Failed', error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  getDoorName() {
    if (this.state.doorName) {
      return this.state.doorName;
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.beaconSetup}>
          <Text style={{textAlign: 'center', fontSize: 20}}>
            press to find available doors
          </Text>
          <Image
            source={require('../../assets/search.png')}
            style={{width: 50, height: 50, margin: 20, marginLeft: 200}}
          />
        </TouchableOpacity>
        <Divider style={{backgroundColor: 'black'}} />
        <View>
          {this.state.doorName && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 20,
              }}>
              <Text style={{textAlign: 'auto', fontSize: 20}}>
                {this.getDoorName()}
              </Text>
              <Button
                title="Open this door"
                onPress={() => this.openDoor(this.state.doorName)}
                color="#572DAF"
              />
            </View>
          )}
          <Divider style={{backgroundColor: 'black'}} />
        </View>
      </View>
    );
  }
}
