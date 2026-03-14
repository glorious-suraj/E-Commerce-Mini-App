import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { RootStackParamList } from '../navigation/StackNavigator';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RouteProps = RouteProp<RootStackParamList, 'ProductDetail'>;

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'ProductDetail'
>;

const ProductDetailScreen = ({
  route,
  navigation,
}: {
  route: RouteProps;
  navigation: NavigationProps;
}) => {
  const { product } = route.params;
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>₹{product.price}</Text>
          <Text style={styles.rating}>Rating: {product.rating.rate}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => {
          dispatch(addToCart(product));
          navigation.getParent()?.navigate('Cart');
        }}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    backgroundColor: '#fff',
    padding: 17,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#a7e9e9',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    elevation: 1,
    borderStyle: 'solid',
  },
  image: {
    height: 250,
    width: '100%',
    resizeMode: 'contain',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2a9d8f',
    marginTop: 8,
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginTop: 12,
    lineHeight: 20,
  },
  button: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: '#2a9d8f',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
