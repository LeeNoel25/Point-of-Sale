import { createContext, useContext, useState, ReactNode } from 'react';
import { LineItemType}  from '../utilities/type-declaration'

type ContextType = {
  lineItems: LineItemType[],
  increaseQuantity: (product: LineItemType) => void,
  reduceQuantity: (id: string) => void,
  removeLineItem: (product: LineItemType) => void,
  clearCart: () => void,  
};

const LineItemsContext = createContext<ContextType | undefined>(undefined);

const useLineItems = () => {
  const context = useContext(LineItemsContext);
  if (!context) {
    throw new Error('useLineItems must be used within a LineItemsProvider');
  }
  return context;
};

type LineItemsProviderProps = {
  children: ReactNode;
}

const LineItemsProvider = ({ children }: LineItemsProviderProps) => {
  const [lineItems, setLineItems] = useState<LineItemType[]>([]);

  const increaseQuantity = (clickedProduct: LineItemType) => {
    setLineItems(products => {
        const isProductInCart = products.find(product => product._id === clickedProduct._id);
        if (isProductInCart) {
          return products.map(product => product._id === clickedProduct._id ? { ...product, quantity: (product.quantity || 0) + 1 } : product);
        }
        return [...products, { ...clickedProduct, quantity: 1 }];
      });
  };

  const reduceQuantity = (id: string) => {
    setLineItems(currentLineItems =>
        currentLineItems.reduce((newLineItems, product) => {
          if (product._id === id) {
            if (product.quantity === 1) return newLineItems;
            return [...newLineItems, { ...product, quantity: (product.quantity || 0) - 1 }];
          } else {
            return [...newLineItems, product];
          }
        }, [] as LineItemType[])
      );
  };

  const removeLineItem = (clickedProduct: LineItemType) => {
    setLineItems(currentLineItems => currentLineItems.filter(item => item._id !== clickedProduct._id));
  };

  const clearCart = () => {
    setLineItems([]);
  };

  const value = {
    lineItems,
    setLineItems,
    increaseQuantity,
    reduceQuantity,
    removeLineItem,
    clearCart,
  };

  return (
    <LineItemsContext.Provider value={value}>
      {children}
    </LineItemsContext.Provider>
  );
};

export { LineItemsProvider, useLineItems };
