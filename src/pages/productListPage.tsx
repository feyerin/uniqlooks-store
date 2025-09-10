import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { fetchProducts, fetchBrands } from "../data/api";
import ProductCard from "../components/productCard";
import Pagination from "../components/pagination";
import type { Brand, Product } from "../types/types";

const ITEMS_PER_PAGE = 12;
const BANNER_IMAGE = "/banners/banner1.jpg";

export default function ProductListPage() {
  const { brandId } = useParams<{ brandId?: string }>();
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products & brands
  const { data: products, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["products", brandId],
    queryFn: () => fetchProducts(brandId),
  });

  const { data: brands } = useQuery<Brand[]>({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  // Filter products per brandId
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return brandId ? products.filter((p) => p.brandId === brandId) : products;
  }, [products, brandId]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const brand = brandId ? brands?.find((b) => b.id === brandId) : null;

  // Loading/Error/No Data
  if (isLoading)
    return <p className="text-center py-20 text-gray-500">Loading products...</p>;
  if (isError)
    return <p className="text-center py-20 text-red-500">Failed to load products</p>;
  if (filteredProducts.length === 0)
    return <p className="text-center py-20 text-gray-500">No products found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Banner */}
      <div className="w-full mb-8 rounded-lg overflow-hidden shadow-md h-64">
        <img
          src={BANNER_IMAGE}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        {brand ? `${brand.name} Products` : "All Products"}
      </h1>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          <p className="text-sm text-gray-500 mt-4 text-center">
            Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} products
          </p>
        </div>
      )}
    </div>
  );
}