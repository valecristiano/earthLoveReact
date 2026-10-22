import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getTags } from "../services/apiService";
import Loader from "../components/Loader";

export default function TagsPage() {
  const [tags, setTag] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    getTags()
      .then((response) => {
        setTag(response.data.results);
      })
      .catch((error) => {
        console.error(error);
        setError("Si è verificato un errore durante il caricamento dei tag.");
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
      <section className="py-4 bg-white">
        <div className="container">
          <div className="text-center mb-3">
            <h2 className="fw-bold">Esplora per Tag</h2>
          </div>

          <div className="row g-3">
            {tags.map((tag) => (
              <div className="col-6 col-lg-4" key={tag.id}>
                <Link to={`/tags/${tag.slug}`} className="tag-box text-decoration-none">
                  {tag.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
