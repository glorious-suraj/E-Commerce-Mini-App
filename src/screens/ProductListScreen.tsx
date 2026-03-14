import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/productSlice';
import ProductCard from '../components/ProductCard';
import { AppDispatch, RootState } from '../store/store';
import Loading from '../components/Loading';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductList'>;

const ProductListScreen = ({ navigation }: { navigation: NavigationProp }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  if (loading) return <Loading />;
  if (error) return <Text>{error}</Text>;

  return (
    <FlatList
      data={items}
      numColumns={2}
      keyExtractor={item => item.id.toString()}
      columnWrapperStyle={{
        justifyContent: 'space-between',
        paddingHorizontal: 14,
      }}
      contentContainerStyle={{
        paddingTop: 15,
        backgroundColor: '#fff',
      }}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() =>
            navigation.navigate('ProductDetail', { product: item })
          }
        />
      )}
    />
  );
};

export default ProductListScreen;
