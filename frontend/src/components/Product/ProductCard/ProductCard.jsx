import { Link } from 'react-router-dom';

import styles from './ProductCard.module.css'
import product1 from "../../../assets/images/product_1.jpg"

const ProductCard = ({p,className})=>{
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