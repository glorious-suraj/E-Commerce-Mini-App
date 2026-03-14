import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import { Product } from '../types/Product';
import ProductListScreen from '../screens/ProductListScreen';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { product: Product };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: 'Products List' }}
      /> 

      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: 'Product Detail' }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
