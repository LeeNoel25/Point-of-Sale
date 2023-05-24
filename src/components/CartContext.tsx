import { createContext, useContext, useState, ReactNode } from 'react';
import { ProductType } from '../utilities/type-declaration'

type CartContextType = {
  cartItems: ProductType[],
  increaseQuantity: (product: ProductType) => void,
  reduceQuantity: (id: string) => void,
  removeCartItem: (product: ProductType) => void,
  clearCart: () => void,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

type CartProviderProps = {
  children: ReactNode;
}

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<ProductType[]>([]);

  const increaseQuantity = (selectedProduct: ProductType) => {
    setCartItems(currentCartItems => {
      const isProductInCart = currentCartItems.find(product => product._id === selectedProduct._id);
      if (isProductInCart) {
        return currentCartItems.map(product => product._id === selectedProduct._id ? { ...product, quantity: (product.quantity || 0) + 1 } : product);
      }
      return [...currentCartItems, { ...selectedProduct, quantity: 1 }];
    });
  };

  const reduceQuantity = (id: string) => {
    setCartItems(currentCartItems =>
      currentCartItems.reduce((updatedCartItems, product) => {
        if (product._id === id) {
          if (product.quantity === 1) return updatedCartItems;
          return [...updatedCartItems, { ...product, quantity: (product.quantity || 0) - 1 }];
        } else {
          return [...updatedCartItems, product];
        }
      }, [] as ProductType[])
    );
  };

  const removeCartItem = (selectedProduct: ProductType) => {
    setCartItems(currentCartItems => currentCartItems.filter(product => product._id !== selectedProduct._id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    increaseQuantity,
    reduceQuantity,
    removeCartItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, useCart };
