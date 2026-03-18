import { Link } from 'react-router-dom';

import Skeleton from 'react-loading-skeleton'; // <--- Import thư viện ở đây
import 'react-loading-skeleton/dist/skeleton.css'; // <--- Đừng quên file CSS của nó

import styles from './ProductCard.module.css'
import product1 from "../../../assets/images/product_1.jpg"

const ProductCard = ({isLoading,p,className})=>{
    // Nếu đang load, trả về bộ khung xương từ thư viện
    if (isLoading || !p) {
        return (
            <div className={`mb-3 ${className || styles.productCard}`}>
                <div className={styles.imageWrapper}>
                    <Skeleton height={200} /> {/* Khung xương cho ảnh */}
                </div>
                <div className={`p-3 text-center ${styles.content}`}>
                    <div className={styles.title}>
                        <Skeleton width="80%" /> {/* Khung xương cho tên */}
                    </div>
                    <div className={styles.price}>
                        <Skeleton width="40%" /> {/* Khung xương cho giá */}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div  className={`mb-3 ${className || styles.productCard}`}>
            <div className={styles.imageWrapper}>
                <img className={styles.avatar} src={product1} alt="" />
                <div className={styles.overlay}>
                    <Link className={styles.viewMoreBtn} to={`/product/${p.id}`}>Xem them</Link>
                </div>
            </div>
            <div className={`p-3 text-center ${styles.content}`}>
                <div className={styles.title}>
                    <Link to={`/product/${p.id}`}>{p.name}</Link>
                </div>
                <div className={styles.price}>{p.base_price}</div>
            </div>
        </div>
    );
}

export default ProductCard