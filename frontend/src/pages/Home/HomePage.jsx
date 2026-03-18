import "./HomePageStyle.css";

import Banner from "../../components/Banner/Banner";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProductSections from "../../components/Product/ProductSections/ProductSections";

import { useEffect } from "react";
import { useSelector } from "react-redux";

export const HomePage = () => {

  const categories = useSelector(
        state => state.category.items
    );

  useEffect(() => {
    // Cuộn lên đầu trang ngay khi vào trang chi tiết
    window.scrollTo(0, 0);
  }, []); // [] đảm bảo chỉ chạy 1 lần khi render

  return (
    <>
      <Banner />
      <ProductSections />
    </>
  );
};