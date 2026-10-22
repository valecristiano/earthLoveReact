import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/apiService";
import Loader from "../components/Loader";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then((response) => {
        setProducts(response.data.results);
      })
      .catch((error) => {
        console.error(error);
        setError("Si è verificato un errore durante il caricamento dei prodotti.");
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
                Prodotti eco-friendly
                <br />
                selezionati per te!
              </h1>
              <p className="lead text-secondary my-4">Vivere in modo più sostenibile, senza rinunciare alla qualità.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row gx-4 gy-5">
            {products.map((product) => (
              <div key={product.id} className="col-6 col-md-3 col-lg-2 ">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
