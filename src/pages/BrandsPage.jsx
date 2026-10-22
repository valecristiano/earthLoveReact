import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getBrands } from "../services/apiService";
import Loader from "../components/Loader";

export default function BrandsPage() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBrands()
      .then((response) => {
        setBrands(response.data.results);
      })
      .catch((error) => {
        console.error(error);
        setError("Si è verificato un errore durante il caricamento dei brand.");
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
              <h1 className="display-4 fw-bold mt-3">I brand sostenibili scelti per voi</h1>
              <p className="lead text-secondary my-4">Vivere in modo più sostenibile, senza rinunciare alla qualità.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="categories">
        <div className="container">
          <div className="row g-4">
            {brands.slice(0, 8).map((brand) => (
              <div className="col-6 col-md-4 col-lg-3" key={brand.id}>
                <Link to={`/brands/${brand.slug}`} className="category-card">
                  <img src={brand.image_url} alt={brand.name} className="img-fluid" />
                  <div className="overlay">
                    <h5>{brand.name}</h5>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
