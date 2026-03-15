# E-Commerce Mini App

## Framework Choice

This app is built using **React Native with TypeScript**.
I chose React Native because it allows building cross-platform mobile apps efficiently, and TypeScript helps maintain better type safety.
For state management I used **Redux Toolkit** to manage products and cart state in a predictable way.

---

## Features

### Product Listing

- Fetches products from **https://fakestoreapi.com/products**
- Displays product image, title, price, and category
- Shows loading state while fetching data
- Displays an error message if the request fails

### Product Detail

- Shows image, title, price, rating, and description
- Includes an **Add to Cart** button

### Shopping Cart

- Displays items with quantity and price
- Users can increase/decrease quantity or remove items
- Shows total price
- Checkout button shows a confirmation message and clears the cart

### Navigation

- Bottom tab navigation with **Products** and **Cart**
- Cart tab displays a badge with the number of items

---

## How to Run

```bash
git clone <repo-link>
cd project-folder
npm install
npm start
npm run android
```

---

## Limitations
 
- Cart is not persisted after app restart
- Basic UI styling

---

## Improvements

- Persist cart using AsyncStorage
- Add product search and filtering
- Improve UI/UX and add animations
