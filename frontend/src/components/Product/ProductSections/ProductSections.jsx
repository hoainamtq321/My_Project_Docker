import styles from './ProductSections.module.css'
import ProductCard from '../ProductCard/ProductCard';
import { getProducts } from "../../../api/productApi";
import { useEffect, useState, useRef } from 'react';

const ProductSection = ()=>{

        const [products, setProducts] = useState([]);
        const [isLoading, setIsLoading] = useState(true); // Khởi tạo là đang load
        const sliderRef = useRef(null);

        useEffect(()=>{
            getProducts(1).then(res => 
                {
                    setProducts(res.data.data);
                    setIsLoading(false); // Có dữ liệu thì set false
                })
                    .catch(err => {
                    console.error(err);
                    setIsLoading(false); // Lỗi cũng set false để tránh treo skeleton
                });
        },[]);

        
        const handleScroll = (direction) => {
            const container = sliderRef.current;
            if (!container) return;

            // Lấy thẻ sản phẩm đầu tiên để tính kích thước thực tế của 1 item
            const firstItem = container.querySelector(`.${styles.productItem}`);
            if (!firstItem) return;

            // scrollAmount bây giờ chỉ bằng độ rộng của 1 sản phẩm
            const scrollAmount = firstItem.offsetWidth; 
            const maxScroll = container.scrollWidth - container.clientWidth;

            if (direction === 'next') {
                // Nếu đã chạm hoặc gần chạm cuối (sai số 5px cho chắc chắn)
                if (container.scrollLeft >= maxScroll - 5) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            } else {
                // Nếu đang ở đầu
                if (container.scrollLeft <= 5) {
                    container.scrollTo({ left: maxScroll, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
            }
        }

    return (
        <div className={styles.productSection}>
            <div className = {`d-flex justify-content-between align-items-center ${styles.header}`}>
                <h2 className={styles.sectionTitle}>sản phẩm mới</h2>
                <div className={styles.controls}>
                    <button onClick={() => handleScroll('prev')} className={`btn btn-outline-dark me-2 ${styles.prev}`}>←</button>
                    <button onClick={() => handleScroll('next')} className={`btn btn-outline-dark ${styles.next}`}>→</button>
                </div>
            </div>

            <div className={styles.productSlider} ref={sliderRef}>
                <div className={styles.productList}>
                    {isLoading 
                        ? // Nếu đang load, hiển thị 8 khung xương giả
                          Array(8).fill(0).map((_, index) => (
                              <ProductCard 
                                  key={`skeleton-${index}`} 
                                  isLoading={true} 
                                  className={styles.productItem} 
                              />
                          ))
                        : // Nếu đã có dữ liệu, hiển thị sản phẩm thật
                          products.map(p => (
                              <ProductCard 
                                  key={p.id} 
                                  p={p} 
                                  isLoading={false}
                                  className={styles.productItem} 
                              />
                          ))
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductSection