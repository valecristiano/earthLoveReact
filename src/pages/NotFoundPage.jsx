import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <section className="banner py-5 min-vh-100 d-flex align-items-center">
      <div className="container text-center">
        <h1 className="display-1 fw-bold text-success" style={{ fontSize: "7rem" }}>
          404
        </h1>

        <h2 className="fw-bold mb-3">Oops! Pagina non trovata</h2>

        <p className="lead text-secondary mb-4">
          La pagina che stai cercando non esiste oppure è stata spostata.
          <br />
          Torna alla Home e continua a scoprire i nostri prodotti sostenibili!
        </p>

        <Link to="/" className="btn btn-lg px-4">
          Torna alla Home
        </Link>
      </div>
    </section>
  );
}
