import { useEffect, useState } from "react";
import { Link } from "react-router";
import ProductCard from "../components/ProductCard";
import { getProducts, getCategories, getTags } from "../services/apiService";
import Loader from "../components/Loader";

export default function HomePage() {
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([getTags(), getCategories(), getProducts()])
      .then(([tagsRes, categoriesRes, productsRes]) => {
        setTags(tagsRes.data.results);
        setCategories(categoriesRes.data.results);
        setProducts(productsRes.data.results);
      })
      .catch((error) => {
        console.error(error);
        setError("Si è verificato un errore durante il caricamento della Homepage.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <>
      <section className="banner py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Testo */}
            <div className="col-lg-6 text-center text-lg-start">
              <span className="text-success fw-semibold">🌿 Sustainable Shopping</span>

              <h1 className="display-4 fw-bold mt-3">
                Shopping sostenibile
                <br />a portata di click!
              </h1>

              <p className="lead text-secondary my-4">Scopri centinaia di prodotti eco-friendly selezionati per aiutarti a vivere in modo più sostenibile, senza rinunciare alla qualità.</p>

              <Link to="/products" className="btn btn-lg px-4">
                Esplora il catalogo
              </Link>
            </div>

            {/* Immagine */}
            <div className="col-lg-6 d-none d-lg-block text-center">
              <img src="public/img/Banner_earthlove.webp" alt="Prodotti ecosostenibili" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
      {/* Sezione Tag */}
      <section className="py-4 bg-white">
        <div className="container">
          <div className="text-center mb-3">
            <Link to={`/tags`} className="text-decoration-none">
              <h2 className="fw-bold">Esplora per Tag</h2>
            </Link>
          </div>

          <div className="row g-3">
            {tags.slice(0, 6).map((tag) => (
              <div className="col-6 col-lg-2" key={tag.id}>
                <Link to={`/tags/${tag.slug}`} className="tag-box text-decoration-none">
                  {tag.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sezione Categorie */}

      <section className="categories py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Categorie</h2>
          </div>

          <div className="row g-4">
            {categories.slice(0, 8).map((category) => (
              <div className="col-6 col-md-4 col-lg-3" key={category.id}>
                <Link to={`/categories/${category.slug}`} className="category-card">
                  <img src={category.image_url} alt={category.name} className="img-fluid" />

                  <div className="overlay">
                    <h5>{category.name}</h5>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prodotti più venduti */}

      <section className="best-sellers py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">I più venduti</h2>
            <p className="text-muted">I prodotti preferiti dalla nostra community.</p>
          </div>

          <div className="row g-4">
            {products.slice(0, 4).map((product) => (
              <div className="col-6 col-lg-3" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
