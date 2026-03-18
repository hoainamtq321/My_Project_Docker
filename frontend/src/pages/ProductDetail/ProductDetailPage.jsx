import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import {getProduct} from "../../api/productApi";

import styles from './ProductDetailPage.module.css'
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';




const ProductDetailPage = () =>{
    // 1. Lấy ID từ thanh URL (ví dụ: /category/2 thì id = 2)
    const { id } = useParams();
    const [product,setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Chống gọi API nếu không có ID
        if (!id) return;

        let isMounted = true; // Kỹ thuật "Clean up" để tránh gọi API chồng chéo

        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await getProduct(id);
                if (isMounted) {
                    setProduct(response.data);
                }
                console.log("Chi tiết sản phẩm:", product);
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    
    // Nếu product là null HOẶC là mảng rỗng (lúc mới khởi tạo) thì không cho xuống dưới
if (loading || !product || (Array.isArray(product) && product.length === 0)) {
    return <div>Đang tải...</div>;
}
    return (
        <div className={`d-flex ${styles.productDetail }`}>
            <ProductGallery images={product.images}/>
            <ProductInfo product={product}/>
        </div>
    );
}

export default ProductDetailPage