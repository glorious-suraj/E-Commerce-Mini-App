import React from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  increaseQty,
  decreaseQty,
  removeItem,
  clearCart,
} from '../store/cartSlice';
import CartItem from '../components/CartItem';
import { RootState } from '../store/store';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../navigation/BottomNavigation';

type NavigationProp = BottomTabNavigationProp<BottomTabParamList, 'Cart'>;

const CartScreen = ({ navigation }: { navigation: NavigationProp }) => {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialDesignIcons name="cart-outline" size={60} color="#ccc" />
          <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Looks like you haven't added anything yet
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 130 }}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                onIncrease={() => dispatch(increaseQty(item.id))}
                onDecrease={() => dispatch(decreaseQty(item.id))}
                onRemove={() => dispatch(removeItem(item.id))}
              />
            )}
          />

          {items.length > 0 && (
            <View style={styles.footer}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalPrice}>₹{total.toFixed(0)}</Text>
              </View>

              <TouchableOpacity
                style={styles.checkout}
                activeOpacity={0.85}
                onPress={() =>
                  Alert.alert(
                    'Order Confirmed',
                    'Your order has been placed successfully',
                    [
                      {
                        text: 'OK',
                        onPress: () => {
                          dispatch(clearCart());
                          navigation.navigate('Products', {
                            screen: 'ProductList',
                          });
                        },
                      },
                    ],
                  )
                }
              >
                <MaterialDesignIcons name="cart-check" size={22} color="#fff" />
                <Text style={styles.checkoutText}>Proceed to Checkout</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: '#333',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#888',
    marginTop: 6,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    elevation: 10,
    paddingBottom: 34,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
    color: '#555',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  checkout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a9d8f',
    paddingVertical: 14,
    borderRadius: 12,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
