import { Link } from "react-router";
import "../assets/css/productCard.css";

export default function ProductCard({ product }) {
  return (
    <div className="product-card h-100 d-flex flex-column">
      <Link to={`/products/${product.slug}`} className="text-decoration-none text-dark">
        <img src={product.image_url} alt={product.name} className="img-fluid rounded-4 product-image" />
      </Link>

      <div className="mt-3 d-flex flex-column flex-grow-1">
        <h5 className="fw-semibold mt-3 mb-2 product-title">{product.name}</h5>

        <p className="text-success fw-semibold mb-1 product-brand">{product.brand?.name}</p>

        <div className="d-flex justify-content-between align-items-center mt-auto pt-3">
          <h5 className="fw-bold mb-0">{product.price} €</h5>

          <Link to={`/products/${product.slug}`} className="fs-2 text-success text-decoration-none">
            →
          </Link>
        </div>
      </div>
    </div>
  );
}
