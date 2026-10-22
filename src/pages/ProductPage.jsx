import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { getProduct } from "../services/apiService";
import Loader from "../components/Loader";

export default function ProductPage() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getProduct(slug)
      .then((response) => {
        setProduct(response.data.results);
      })
      .catch((error) => {
        console.error(error);
        setError("Si è verificato un errore durante il caricamento del prodotto.");
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
        <div>
          <button onClick={() => navigate(-1)} className="btn btn-outline-success btn-sm">
            <i className="bi bi-arrow-left"></i> Torna Indietro
          </button>
        </div>
        <div className="row g-5">
          {/* IMMAGINE */}
          <div className="col-md-6">
            <img src={product.image_url} alt={product.name} className="img-fluid rounded shadow-sm" />
          </div>

          {/* INFO PRODOTTO */}
          <div className="col-md-6">
            <h1 className="mb-3">{product.name}</h1>

            <p className="text-muted mb-2">{product.description}</p>

            <h4 className="text-success mb-5">{product.price} €</h4>

            {/* BRAND + CATEGORIA */}
            <div className="mb-2">
              <p className="mb-1">
                Brand:{" "}
                <Link to={`/brands/${product.brand?.slug}`} className="link-secondary link-underline-success">
                  {product.brand?.name}
                </Link>
              </p>

              <p className="mb-0">
                Categoria:{" "}
                <Link to={`/categories/${product.category?.slug}`} className="link-secondary link-underline-success">
                  {product.category?.name || "Nessuna categoria"}
                </Link>
              </p>
            </div>

            {/* TAGS */}
            <div className="mb-4">
              {product.tags?.map((tag) => (
                <span key={tag.id} className="badge bg-success me-2">
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
