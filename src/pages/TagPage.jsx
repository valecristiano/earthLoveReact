import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ProductCard from "../components/ProductCard";
import { getTag } from "../services/apiService";
import Loader from "../components/Loader";

export default function TagPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [tag, setTag] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTag(slug)
      .then((response) => {
        setTag(response.data.results);
      })
      .catch((error) => {
        console.error(error);
        setError("Si è verificato un errore durante il caricamento del tag.");
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
      <section className="container py-4">
        <div className="mb-4">
          <button onClick={() => navigate(-1)} className="btn btn-outline-success btn-sm">
            <i className="bi bi-arrow-left"></i> Torna Indietro
          </button>
        </div>

        <h1 className="tag-box text-decoration-none">{tag.name}</h1>
        <div className="row">
          <div className="col">
            <div className="">
              <section className="best-sellers">
                <div className="container">
                  <div className="row g-4">
                    {tag.products.map((product) => (
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
      </section>
    </>
  );
}
