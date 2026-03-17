import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // CHỈ CẦN 1 DÒNG NÀY: Đọc dữ liệu ngay khi khởi tạo State
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem("temp_cart");
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error("Lỗi parse JSON từ LocalStorage:", error);
            return [];
        }
    });

    // Tự động lưu vào LocalStorage mỗi khi giỏ hàng thay đổi
    // Lưu ý: useEffect này sẽ chạy sau khi render, đảm bảo cart đã có dữ liệu mới nhất
    useEffect(() => {
        localStorage.setItem("temp_cart", JSON.stringify(cart));
    }, [cart]);

    // Hàm thêm sản phẩm
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (item) => item.id === product.id && item.variant_id === product.variant_id
            );

            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id && item.variant_id === product.variant_id
                        ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: product.quantity || 1 }];
        });
    };

    // Hàm xóa sản phẩm
    const removeFromCart = (productId, variantId) => {
        setCart(prev => prev.filter(item => !(item.id === productId && item.variant_id === variantId)));
    };

    // Hàm cập nhật số lượng
    const updateQuantity = (productId, variantId, newQty) => {
        if (newQty < 1) return;
        setCart(prev => prev.map(item => 
            (item.id === productId && item.variant_id === variantId) 
            ? { ...item, quantity: newQty } 
            : item
        ));
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            removeFromCart, 
            updateQuantity, 
            setCart,
            totalItems,
            totalPrice 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);