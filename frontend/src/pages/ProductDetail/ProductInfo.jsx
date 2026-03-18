import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';

// Import hook useCart từ Context của bạn
import { useCart } from "../../context/CartContext";

import QuantityInput from "../../components/UI/QuantityInput/QuantityInput";

import styles from "./ProductDetailPage.module.css"

import iconSelect from '../../assets/images/select.png'

import { addToCart } from "../../features/cart/cartSlice";

import {getProduct} from "../../api/productApi";

const ProductInfo = ({product})=>{
    const productData = product.data;

    // Lấy hàm addToCart từ Context
    const { addToCart } = useCart();

    const sizes = product.options['sizes'] || [];
    const colors = product.options['colors'] || [];

    const [size,setSize] = useState(sizes[0]);
    const [color,setColor] = useState(colors[0]);  
    const [quantity,setQuantity] = useState(1);
    
    const selectSize = (e)=> setSize(e.target.value);
    const selectColor = (e)=>setColor(e.target.value);
    
    // --- Logic Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Tạo key để tra cứu trong variant_map (dạng "Màu-Size")
        // Lưu ý: JSON của bạn là "Trắng-M", nên phải ghép đúng thứ tự này
        const variantKey = `${color}-${size}`;
        const variantInfo = product.variant_map ? product.variant_map[variantKey] : null;

        // 2. Xác định giá: ưu tiên giá của biến thể, nếu null thì lấy base_price
        const finalPrice = variantInfo?.price ? variantInfo.price : productData.base_price;

        // 3. Gom dữ liệu
        const productToCart = {
            id: productData.id,
            variant_id: variantInfo ? variantInfo.id : null,
            name: productData.name,
            price: parseFloat(finalPrice), // Ép kiểu về số để tính toán
            image: productData.images?.find(img => img.is_primary === 1)?.image_path 
                || productData.images?.[0]?.image_path, // Lấy ảnh chính, nếu không có thì lấy ảnh đầu
            selectedSize: size,
            selectedColor: color,
            quantity: Number(quantity)
        };

        // 4. Thêm vào giỏ hàng
        addToCart(productToCart);

        alert(`Đã thêm ${quantity} sản phẩm "${productData.name}" (Size: ${size}, Màu: ${color}) vào giỏ hàng!`);
        console.log("Dữ liệu đã thêm:", productToCart);
    };

    return (
            <div className={styles.infoSection}>
                <div className={styles.productContent}>
                    <div className={styles.productName}>
                        <h3 className={styles.name} ><strong>{productData.name}</strong></h3>
                    </div>
                    <div className={styles.productBrand}>
                        <p>Thuowng hieu : mck</p>
                    </div>
                    <div className={styles.productSku}>
                        <p>MSP:dfdfsdf</p>
                    </div>
                    <div className={styles.productPrice}>
                        <p className={styles.price}><strong>{productData.base_price	}</strong></p>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit} method="post">
                    <div className={styles.sizeSection}>
                        <div className={styles.title}>
                            <strong>Kich thuoc</strong>
                        </div>
                        <div className={styles.sizeItems}>
                            {sizes.map((x,index)=>(
                                <label key={index} className={styles.sizeItem}>
                                    <input type="radio" value={x} name="sizeSection" id="sizeSection1" checked={size === x} onChange={selectSize}/>
                                    <span className={styles.itemBtn}>{x}</span>
                                    <img className={styles.itemImg} src={iconSelect} alt="" />
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className={styles.colerSection}>
                        <div className={styles.title}>
                            <strong>Mau sac</strong>
                        </div>
                        <div className={styles.colerItems}>
                            {colors.map((x,index)=>(
                                <label key={index} className={styles.colorItem} >
                                    <span className={styles.colorItemBtn} style={{backgroundColor: x}}></span>
                                    <input type="radio" value={x} name="colerSection" checked = {color === x} onChange={selectColor}/>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className={styles.quantitySection}>
                        <div className={styles.quantityTitle}>
                            <strong>So luong</strong>
                        </div>
                        <QuantityInput value={quantity} onChange={setQuantity}/>
                    </div>
                    <div className={styles.productActions}>
                        <button className={styles.addToCart} type="submit">Add card</button>
                        <button className={styles.buyNow}type="button">Mua ngay</button>
                    </div>
                    
                </form>
                <div className={styles.description}>
                    <p>kfdhgdfgdjfgdkfg</p>
                </div>
            </div>
    );
}

export default ProductInfo