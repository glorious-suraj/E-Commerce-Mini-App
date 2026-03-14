import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartScreen from '../screens/CartScreen';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import StackNavigator, { RootStackParamList } from './StackNavigator';

export type BottomTabParamList = {
  Products: NavigatorScreenParams<RootStackParamList>;
  Cart: undefined;
};

const Tabs = createBottomTabNavigator<BottomTabParamList>();

const BottomNavigation = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const getTabBarIcon = (
    route: RouteProp<BottomTabParamList, keyof BottomTabParamList>,
    focused: boolean,
    color: string,
    size: number,
  ) => {
    let iconName: 'home' | 'home-outline' | 'cart' | 'cart-outline' = 'home';

    if (route.name === 'Products') {
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === 'Cart') {
      iconName = focused ? 'cart' : 'cart-outline';
    }

    return <MaterialDesignIcons name={iconName} size={size} color={color} />;
  };

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) =>
          getTabBarIcon(route, focused, color, size),
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tabs.Screen name="Products" component={StackNavigator} />

      <Tabs.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
          tabBarBadgeStyle: {
            fontSize: 12,
            minWidth: 18,
            height: 18,
            borderRadius: 10,
          },
          headerShown: true,
        }}
      />
    </Tabs.Navigator>
  );
};

export default BottomNavigation;
