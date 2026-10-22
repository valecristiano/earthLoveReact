import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import ProductCard from "../components/ProductCard";
import { getBrand } from "../services/apiService";
import Loader from "../components/Loader";

export default function BrandPage() {
  const { slug } = useParams();

  const [brand, setBrand] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getBrand(slug)
      .then((response) => {
        setBrand(response.data.results);
      })
      .catch((error) => {
        console.error(error);
        setError("Si è verificato un errore durante il caricamento del Brand.");
      })
      .finally(() => setLoading(false));
  }, [slug]);

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
      <div className="container py-5">
        <div className="mb-3">
          <button onClick={() => navigate(-1)} className="btn btn-outline-success btn-sm">
            <i className="bi bi-arrow-left"></i> Torna Indietro
          </button>
        </div>
        <div className="row g-5">
          {/* IMMAGINE */}
          <div className="col-md-6">
            <img src={brand.image_url} alt={brand.name} className="img-fluid rounded shadow-sm" />
          </div>

          {/* INFO PRODOTTO */}
          <div className="col-md-6">
            <h1 className="mb-3">{brand.name}</h1>

            <p className="text-muted mb-2">{brand.description}</p>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col">
            <div className="border-top pt-4">
              <h5>Prodotti</h5>
              <section className="best-sellers py-5">
                <div className="container">
                  <div className="row g-4">
                    {brand.products.slice(0, 4).map((product) => (
                      <div className="col-12 col-sm-6 col-lg-3" key={product.id}>
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
