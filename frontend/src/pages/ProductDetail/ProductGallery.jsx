import styles from "./ProductDetailPage.module.css"
import productImg from '../../assets/images/product_1.jpg'

const ProductGallery = ()=>{
    return(
        <div className={`d-flex justify-content-between ${styles.gallerySection} `}>
                <ul className={styles.thumbnailList}>
                    <li className={styles.thumbItem}>
                        <img src={productImg} alt="" />
                    </li>
                    <li className={styles.thumbItem}>
                        <img src={productImg} alt="" />
                    </li>
                </ul>
                <div className={styles.mainImage}>
                    <img src={productImg} alt="" />
                </div>
        </div>
    );
}

export default ProductGallery