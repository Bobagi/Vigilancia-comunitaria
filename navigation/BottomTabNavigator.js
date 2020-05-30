import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import LoginScreen from '../screens/LoginScreen';
import FeedScreen from '../screens/FeedScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Login';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route), headerShown: false });
  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#F8F8F8',
        inactiveTintColor: '#586589',
        style: {
          backgroundColor: '#8e2e9c'
        },
        tabStyle: {}
      }}
    >
      <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: 'livrinho',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={FeedScreen}
        options={{
          title: 'Feed',
          headerShown: true,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />
        }}
      />
      <BottomTab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login',
          tabBarVisible: false,
          tabBarIcon: ({ focused }) => <FontAwesome name="user-o" size={24} color="#fafafa" />,
        }}
      />
      <BottomTab.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: 'Register',
          tabBarVisible: false,
          tabBarIcon: ({ focused }) => <FontAwesome name="user-profile" size={24} color="#fafafa" />,
        }}
      />
    </BottomTab.Navigator>

  );
}

const styles = {
  bottom: {
    backgroundColor: 'pink'
  },
  menu: {
    backgroundColor: 'purple',
    borderWidth: 1
  },
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'Links':
      return 'Links to learn more';
    case 'Login':
      return 'Welcome back';
    case 'Register':
      return 'Star to use now';
  }
}
