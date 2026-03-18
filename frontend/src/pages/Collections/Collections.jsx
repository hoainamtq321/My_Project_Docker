import styles from "./Collections.module.css";

import Banner from "../../components/Banner/Banner";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProductList from "../../components/Product/ProductList/ProductList";

import { useEffect,useMemo } from "react";


import { useCategory } from "../../context/CategoryContext";
import { buildCategoryTree } from "../../utils/categoryTree";

export const CollectionsPage = () => {

  const {categories} = useCategory(); // Lấy data từ Context
  const categoryTree = useMemo(
      () => buildCategoryTree(categories),
      [categories]
  );
  
  useEffect(() => {
    // Cuộn lên đầu trang ngay khi vào trang chi tiết
    window.scrollTo(0, 0);
  }, []); // [] đảm bảo chỉ chạy 1 lần khi render

  return (
    <>
      <Banner />
      <div className={`content d-flex ${styles.collections}`}>
        <div className={styles.boxFirst}>
          <Sidebar categoryTree={categoryTree}/>
        </div>
        <div className={styles.boxFinal}>
          <ProductList />
        </div>
      </div>
    </>
  );
};