import { Product } from "@/types";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
} from "react";

type CartState = Record<string, Product>;

type CartAction =
  | { type: "INCREMENT_PRODUCT"; product: Product }
  | { type: "DECREMENT_PRODUCT"; productId: string; remove?: boolean }
  | { type: "EMPTY_CART" };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "INCREMENT_PRODUCT": {
      const { name, ...product } = action.product;
      const existingProduct = state[name];

      return {
        ...state,
        [name]: {
          name,
          ...product,
          quantity: existingProduct?.quantity
            ? existingProduct.quantity + 1
            : 1,
        },
      };
    }

    case "DECREMENT_PRODUCT": {
      const { productId, remove } = action;
      const existingProduct = state[productId];

      if (!existingProduct) return state;

      const updatedQuantity = remove ? 0 : (existingProduct?.quantity ?? 1) - 1;

      if (updatedQuantity > 0) {
        return {
          ...state,
          [productId]: {
            ...existingProduct,
            quantity: updatedQuantity,
          },
        };
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [productId]: _, ...remainingProducts } = state;
        return remainingProducts;
      }
    }

    case "EMPTY_CART": {
      return {};
    }

    default:
      return state;
  }
};

interface ICartContext {
  cart: CartState;
  incrementProduct: (product: Product) => void;
  decrementProduct: (productId: string, remove?: boolean) => void;
  getProductByName: (productId: string) => Product | undefined;
  emptyCart: () => void;
}

const CartContext = createContext<ICartContext | null>(null);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, {});

  const incrementProduct = useCallback((product: Product) => {
    dispatch({ type: "INCREMENT_PRODUCT", product });
  }, []);

  const decrementProduct = useCallback(
    (productId: string, remove?: boolean) => {
      dispatch({ type: "DECREMENT_PRODUCT", productId, remove });
    },
    []
  );

  const emptyCart = useCallback(() => {
    dispatch({ type: "EMPTY_CART" });
  }, []);

  const getProductByName = useCallback(
    (productId: string): Product | undefined => {
      return cart[productId];
    },
    [cart]
  );

  const value = {
    cart,
    incrementProduct,
    decrementProduct,
    getProductByName,
    emptyCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext) as ICartContext;

export default CartProvider;
