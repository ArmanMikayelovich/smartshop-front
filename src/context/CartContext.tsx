import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { get, set, del, clear } from 'idb-keyval';
import {CartItem, mapToCartItem, Product, ProductDetails} from "../services/types";



interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product | ProductDetails) => void; // Updated type
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => Promise<void>;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load cart from IndexedDB on mount
    useEffect(() => {
        const initializeCart = async () => {
            try {
                const savedCart = await get<CartItem[]>('cart');
                setCartItems(savedCart || []);
            } catch (error) {
                console.error('Failed to load cart:', error);
                setCartItems([]);
            } finally {
                setIsInitialized(true);
            }
        };

        // Handle the promise properly
        initializeCart().catch((error) => {
            console.error('Cart initialization failed:', error);
            setCartItems([]);
            setIsInitialized(true);
        });
    }, []);

    // Save cart to IndexedDB on changes
    useEffect(() => {
        if (!isInitialized) return;

        const saveCart = async () => {
            try {
                await set('cart', cartItems);
            } catch (error) {
                console.error('Failed to save cart:', error);
            }
        };
        saveCart();
    }, [cartItems, isInitialized]);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const addToCart = (product: Product | ProductDetails) => {
        const cartItem = mapToCartItem(product);

        setCartItems(prev => {
            const existing = prev.find(i => i.id === cartItem.id);
            return existing
                ? prev.map(i =>
                    i.id === cartItem.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                )
                : [...prev, { ...cartItem, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems(prev => {
            const newCart = prev.filter(item => item.id !== id);
            // Cleanup individual item if needed
            del(`cart-item-${id}`).catch(console.error);
            return newCart;
        });
    };

    const updateQuantity = (id: number, quantity: number) => {
        setCartItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        ));
    };

    const clearCart = async () => {
        try {
            await clear(); // Clean entire IndexedDB store
            setCartItems([]);
        } catch (error) {
            console.error('Failed to clear cart:', error);
        }
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);