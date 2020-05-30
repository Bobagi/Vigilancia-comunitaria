import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import LinksScreen from './screens/LinksScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import Firebase, { FirebaseProvider } from "./config/Firebase";

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();
        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());
        // Load fonts
        await Font.loadAsync({
          'ubuntu': require('./assets/fonts/ubuntu/Ubuntu-Regular.ttf'),
          'ubuntu-bold': require('./assets/fonts/ubuntu/Ubuntu-Bold.ttf'),
          'ubuntu-italic': require('./assets/fonts/ubuntu/Ubuntu-Italic.ttf'),
          'ubuntu-bold-italic': require('./assets/fonts/ubuntu/Ubuntu-BoldItalic.ttf'),
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }
    setLoggedIn(true);
    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <FirebaseProvider value={Firebase}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
            <Stack.Navigator>            
              {isLoggedIn ? (
                <Stack.Screen name="Root" component={BottomTabNavigator} />
              ) : (
                  <>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Settings" component={LinksScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />                     
                  </>
                )}
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </FirebaseProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
