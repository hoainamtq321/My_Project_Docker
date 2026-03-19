import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {HomePage} from "../pages/Home/HomePage";
import {CollectionsPage} from "../pages/Collections/Collections";
import {AboutPage} from "../pages/AboutPage";
import AuthPage from "../pages/Auth/AuthPage";
import LogoutPage from '../pages/Auth/LogoutPage';
import  NotFound  from "../pages/NotFound/NotFoundPage";

import ProductDetailPage from "../pages/ProductDetail/ProductDetailPage";
import CartPage from "../pages/Cart/CartPage";


const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/collections/:slug" element={<CollectionsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/auth/:type" element={<AuthPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/cart" element={<CartPage/>} />

        {/* Dòng mới: :id là tham số động, đại diện cho ID của sản phẩm */}
        <Route path="/product/:id" element={< ProductDetailPage />} />

        {/* 404 – LUÔN ĐẶT CUỐI */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Trang KHÔNG có header/footer */}
      {/*
        VD: <Route path="/login" element={<Login />} />
      */}
      
      {/* 404 – LUÔN ĐẶT CUỐI */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;
