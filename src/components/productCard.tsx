import type { Product } from "../types/types";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 cursor-pointer overflow-hidden">
        {/* Image */}
        <div className="w-full h-48 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg truncate">{product.name}</h3>
          <p className="mt-3 font-bold text-lg text-red-600">${product.price}</p>
        </div>
      </div>
    </Link>
  );
}