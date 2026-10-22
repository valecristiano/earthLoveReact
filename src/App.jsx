import { BrowserRouter, Route, Routes } from "react-router";

import HomePage from "./pages/HomePage";
import DefaultLayout from "./layouts/DefaultLayout";
import ProductsPage from "./pages/ProductsPage";
import BrandsPage from "./pages/BrandsPage";
import CategoriesPage from "./pages/CategoriesPage";
import ProductPage from "./pages/ProductPage";
import BrandPage from "./pages/BrandPage";
import CategoryPage from "./pages/CategoryPage";
import TagsPage from "./pages/TagsPage";
import TagPage from "./pages/TagPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route index Component={HomePage}></Route>
            <Route path="/products" Component={ProductsPage}></Route>
            <Route path="/products/:slug" Component={ProductPage}></Route>
            <Route path="/brands" Component={BrandsPage}></Route>
            <Route path="/brands/:slug" Component={BrandPage}></Route>
            <Route path="/categories" Component={CategoriesPage}></Route>
            <Route path="/categories/:slug" Component={CategoryPage}></Route>
            <Route path="/tags/" Component={TagsPage}></Route>
            <Route path="/tags/:slug" Component={TagPage}></Route>
            <Route path="*" Component={NotFoundPage} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
