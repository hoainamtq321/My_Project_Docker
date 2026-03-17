import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const getProducts = (page = 1, categorySlug = null) => {
   if (categorySlug) {
    return api.get(`/collections/${categorySlug}?page=${page}`);
  }

  return api.get(`/products?page=${page}`);
}
export const getProduct = (id) => api.get(`/products/${id}`);

export const getNewestProducts = () => api.get('/collections/newest');