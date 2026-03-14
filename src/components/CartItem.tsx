import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CartItemType } from '../types/Product';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

interface Props {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const CartItem = ({ item, onIncrease, onDecrease, onRemove }: Props) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.details}>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.price}>₹{item.price.toFixed(0)}</Text>
        <Text style={styles.total}>
          Total: ₹{(item.price * item.quantity).toFixed(0)}
        </Text>

        <View style={styles.bottomRow}>
          <View style={styles.qtyContainer}>
            <TouchableOpacity style={styles.qtyBtn} onPress={onDecrease}>
              <MaterialDesignIcons name="minus" size={18} color="#333" />
            </TouchableOpacity>

            <Text style={styles.qtyText}>{item.quantity}</Text>

            <TouchableOpacity style={styles.qtyBtn} onPress={onIncrease}>
              <MaterialDesignIcons name="plus" size={18} color="#333" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.deleteBtn} onPress={onRemove}>
            <MaterialDesignIcons name="delete-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 16,
    marginBottom: 14,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#38bebe',
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 12,
    resizeMode: 'contain',
    backgroundColor: '#f6f6f6',
    padding: 9,
  },
  details: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    lineHeight: 20,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2a9d8f',
    marginTop: 4,
  },
  total: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f5',
    borderRadius: 10,
    paddingHorizontal: 4,
  },
  qtyBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  qtyText: {
    fontSize: 15,
    fontWeight: '600',
    marginHorizontal: 8,
  },
  deleteBtn: {
    backgroundColor: '#e63946',
    padding: 8,
    borderRadius: 8,
  },
});
