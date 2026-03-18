import styles from './ProductList.module.css'

import { FaSortDown } from "react-icons/fa";

import { getProducts } from "../../../api/productApi";
import { useState ,useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom"; // Thêm hook này đưa số trang lên URL Query Params

import ProductCard from "../ProductCard/ProductCard";
import DropDown from '../../UI/SubMenu/DropDown/DropDown';

import { SIZE_OPTIONS, PRICE_OPTIONS } from '../../../config/filterConfig';

const ProductList = ()=>{

    const [products, setProducts] = useState([]);
    const [isHover,setIsHover] = useState(false);

    // Quản lý trạng thái trang hiện tại
    const { slug } = useParams(); // Lấy "dam-suong" từ đường dẫn /collections/:slug
    console.log("Slug từ URL:", slug); // Kiểm tra slug có đúng không
    const currentPage = parseInt(useSearchParams()[0].get("page") || "1"); // Lấy page từ URL, mặc định là 1 nếu không có
    const [lastPage, setLastPage] = useState(1);
        // Khai báo searchParams để đọc/ghi lên URL
    const [searchParams, setSearchParams] = useSearchParams();
        // Lấy số trang từ URL (mặc định là 1 nếu URL không có ?page=)
    
    
    useEffect(() => {
        // 2. Truyền currentPage vào hàm gọi API
        getProducts(currentPage,slug).then(res => {
            // Laravel trả về dữ liệu nằm trong res.data.data
            setProducts(res.data.data); 
            // Cập nhật tổng số trang để chặn nút bấm khi hết trang
            setLastPage(res.data.last_page);
        });
        
    }, [currentPage, slug]); // useEffect sẽ chạy lại mỗi khi currentPage thay đổi

    useEffect(() => {
    console.log("Dữ liệu sản phẩm mới nhất:", products);
}, [products]); // Chạy mỗi khi products có giá trị mới
   
// 3. Hàm xử lý chuyển trang bằng cách thay đổi URL
    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= lastPage) {
            setSearchParams({ page: newPage });
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu
        }
    };


    return (
        <div className={styles.container}>
            <div className={`d-flex ${styles.filterBar}`}>
                <div className={styles.title}>
                    <h3>Title</h3>
                </div>
                <div className={styles.options}>
                    <ul className={styles.listItem}>
                        <li className={styles.item}
                            onMouseEnter={()=>setIsHover(true)}
                            onMouseLeave={()=>setIsHover(false)}
                        >
                            Size<FaSortDown className={styles.icon}/>
                            <DropDown isHover={isHover} options={SIZE_OPTIONS}/>
                        </li>
                        <li className={styles.item}>Color<FaSortDown className={styles.icon}/></li>
                        <li className={styles.item}>Price<FaSortDown className={styles.icon}/></li>
                        <li className={styles.item}>interface
                            <FaSortDown className={styles.icon}/>
                            <DropDown isHover={isHover} options={PRICE_OPTIONS}/>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.content}>
                <div className={`${styles.grid} d-flex justify-content-start flex-wrap `} >
                
                    {products.map(p =>(<ProductCard key={p.id} p={p} className={styles.customCardSize}/>))}

                </div>

                {/* 4. Bộ nút phân trang */}
                <div className="d-flex justify-content-center align-items-center mt-5 mb-5 gap-3">
                    <button 
                        className="btn btn-outline-dark" 
                        disabled={currentPage <= 1}
                        onClick={() => changePage(currentPage - 1)}
                    >
                        Trước
                    </button>

                    <span className="fw-bold">Trang {currentPage} / {lastPage}</span>

                    <button 
                        className="btn btn-outline-dark"
                        disabled={currentPage >= lastPage}
                        onClick={() => changePage(currentPage + 1)}
                    >
                        Sau
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductList
