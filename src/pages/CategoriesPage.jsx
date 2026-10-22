import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getCategories } from "../services/apiService";
import Loader from "../components/Loader";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response.data.results);
      })
      .catch((error) => {
        console.error(error);
        setError("Si è verificato un errore durante il caricamento delle categorie.");
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
              <h1 className="display-4 fw-bold mt-3">Le categorie più cercate</h1>
              <p className="lead text-secondary my-4">Vivere in modo più sostenibile, senza rinunciare alla qualità.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="categories">
        <div className="container">
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
    </>
  );
}
