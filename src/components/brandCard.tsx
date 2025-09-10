import type { Brand } from "../types/types";
import { Link } from "react-router-dom";

interface Props {
  brand: Brand;
}

export default function BrandCard({ brand }: Props) {
  return (
    <Link
      to={`/products/${brand.id}`}
      className="flex flex-col items-center group"
    >
      <div className="w-28 h-28 flex items-center justify-center border rounded-full overflow-hidden bg-gray-50 group-hover:shadow-md transition">
        <img
          src={brand.logoUrl}
          alt={brand.name}
          className="w-16 h-16 object-contain"
        />
      </div>
      <h2 className="mt-4 text-sm font-medium tracking-wide">{brand.name}</h2>
    </Link>
  );
}