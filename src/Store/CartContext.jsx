import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false); // <-- Add this flag

  // ✅ Load cart from Firestore when user logs in
 useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const cartRef = doc(db, "cart", user.uid);
          const cartSnap = await getDoc(cartRef);

          if (cartSnap.exists() && cartSnap.data().userId === user.uid) {
            setCartItems(cartSnap.data().items || []);
          } else {
            setCartItems([]);
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
          setCartItems([]);
        }
        setIsCartLoaded(true); // <-- Set flag true after fetching
      } else {
        setCartItems([]);
        setIsCartLoaded(false); // reset if no user
      }
    };

    fetchCart();
  }, [user]);
  // ✅ Save cart to Firestore whenever cartItems changes
  useEffect(() => {
    const saveCart = async () => {
      if (user && isCartLoaded) {  // <-- Save only if cart loaded
        try {
          const cartRef = doc(db, "cart", user.uid);
          await setDoc(cartRef, {
            items: cartItems,
            userId: user.uid,
          });
        } catch (error) {
          console.error("Error saving cart:", error);
        }
      }
    };

    saveCart();
  }, [cartItems, user, isCartLoaded]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const exist = prevItems.find((item) => item.id === product.id);
      if (exist) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const increaseQty = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, increaseQty, decreaseQty, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
