import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Provider } from 'react-redux';
import store from './src/redux/store/store';

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './src/screens/Home';
import { HOME } from './src/router/constants';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={styles.app}>
          <Drawer.Navigator>
            <Drawer.Screen name={HOME} component={Home} />
          </Drawer.Navigator>
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  app: {
    width: "100%",
    height: "100%"
  }
})