import api from "../api/axios";

export function getProducts() {
  return api.get("/products");
}
export function getProduct(slug) {
  return api.get(`/products/${slug}`);
}

export function getCategories() {
  return api.get("/categories");
}
export function getCategory(slug) {
  return api.get(`/categories/${slug}`);
}

export function getBrands() {
  return api.get("/brands");
}
export function getBrand(slug) {
  return api.get(`/brands/${slug}`);
}

export function getTags() {
  return api.get("/tags");
}

export function getTag(slug) {
  return api.get(`/tags/${slug}`);
}
