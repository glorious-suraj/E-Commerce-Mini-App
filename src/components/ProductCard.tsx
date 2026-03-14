import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { CartItemType, Product } from '../types/Product';
import { addToCart } from '../store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  product: Product;
  onPress: () => void;
}

const ProductCard = ({ product, onPress }: Props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(
    (state: { cart: { items: CartItemType[] } }) => state.cart.items,
  );

  
  const handleAddToCart = () => {
    const cartItem = cartItems.find(item => item.id === product.id);

    if (cartItem && cartItem.quantity >= 5) {
      Alert.alert('Limit', 'You can only add 5 of this item');
      return;
    }

    dispatch(addToCart(product));

    Alert.alert('Success', 'Product added to cart');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <View style={styles.priceBox}>
            <Text style={styles.price}>₹{product.price.toFixed(0)}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Text numberOfLines={2} style={styles.title}>
        {product.title}
      </Text>
      <Text style={styles.category}>{product.category}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleAddToCart}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#a7e9e9',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingTop: 5,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 11,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eef2f7',
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
  },
  image: {
    height: 150,
    width: '90%',
    resizeMode: 'contain',
  },
  priceBox: {
    position: 'absolute',
    left: 10,
    bottom: 5,
    backgroundColor: '#16a34a',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  price: {
    fontWeight: '700',
    fontSize: 12,
    color: '#fff',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    color: '#1f2937',
    paddingHorizontal: 10,
  },
  category: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 3,
    paddingHorizontal: 10,
    marginBottom: 7,
  },
  button: {
    backgroundColor: '#2a9d8f',
    paddingVertical: 7,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 'auto',
    marginBottom: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default ProductCard;
