import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/categories");
                setCategories(res.data);
            } catch (err) {
                console.error("Lỗi khi lấy danh mục:", err);
            }
        };

        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = () => useContext(CategoryContext);