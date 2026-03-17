import styles from "./CartPage.module.css";
import { useEffect } from "react";
// 1. Import hook useCart
import { useCart } from "../../context/CartContext";
import QuantityInput from "../../components/UI/QuantityInput/QuantityInput";

const CartPage = () => {
    // 2. Lấy dữ liệu và các hàm từ Context
    const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.cart}>
            <div className={styles.cartHeader}>
                <strong><h3>Giỏ hàng của bạn</h3></strong>
            </div>
            
            <div className={styles.cartBody}>
                {/* Kiểm tra nếu giỏ hàng trống */}
                {cart.length === 0 ? (
                    <div className={styles.emptyCart}>
                        <p>Giỏ hàng đang trống.</p>
                        <a href="/collections">Tiếp tục mua sắm</a>
                    </div>
                ) : (
                    <form onSubmit={(e) => e.preventDefault()}>
                        <table className={styles.table}>
                            <thead>
                                <tr className={styles.row}>
                                    <th>Hình ảnh</th>
                                    <th>Sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Tổng</th>
                                    <th>Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={`${item.id}-${item.variant_id}`} className={styles.row}>
                                        <td className={styles.colImage}>
                                            <img src={item.image} alt={item.name} />
                                        </td>
                                        <td className={styles.colName}>
                                            <div>{item.name}</div>
                                            <small>Size: {item.selectedSize} - Màu: {item.selectedColor}</small>
                                        </td>
                                        <td className={styles.colPrice}>
                                            {Number(item.price).toLocaleString()}đ
                                        </td>
                                        <td className={styles.colQty}>
                                            <QuantityInput 
                                                value={item.quantity} 
                                                onChange={(newQty) => updateQuantity(item.id, item.variant_id, newQty)}
                                            />
                                        </td>
                                        <td className={styles.colSubtotal}>
                                            {(item.quantity * item.price).toLocaleString()}đ
                                        </td>
                                        <td className={styles.colRemove}>
                                            <button 
                                                type="button" 
                                                onClick={() => removeFromCart(item.id, item.variant_id)}
                                                className={styles.removeBtn}
                                            >
                                                ✕
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className={styles.cartSummary}>
                            <h4>Tổng tiền thanh toán: <span>{totalPrice.toLocaleString()}đ</span></h4>
                        </div>

                        <div className={styles.cartActions}>
                            <textarea placeholder="Ghi chú đơn hàng..."></textarea>
                            <button className={styles.buyBtn}>Thanh toán ngay</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default CartPage;