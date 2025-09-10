import { useQuery } from "@tanstack/react-query";
import { HiSearch } from "react-icons/hi";
import { useState, useMemo } from "react";
import { fetchBrands } from "../data/api";
import BrandCard from "../components/brandCard";
import Pagination from "../components/pagination";
import type { Brand } from "../types/types";

const ITEMS_PER_PAGE = 8;

export default function BrandListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: brands, isLoading, isError } = useQuery<Brand[]>({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  if (isLoading)
    return <p className="text-center py-20 text-gray-500">Loading brands...</p>;
  if (isError || !brands || brands.length === 0)
    return <p className="text-center py-20 text-red-500">No brands found</p>;

  // Filter brands by search term
  const filteredBrands = useMemo(
    () =>
      brands.filter((brand) =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [brands, searchTerm]
  );

  const totalPages = Math.ceil(filteredBrands.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBrands = filteredBrands.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Banner */}
      <div className="relative rounded-lg overflow-hidden mb-8 h-48 md:h-64">
        <img
          src="/banners/banner1.jpg"
          alt="Brands Banner"
          className="w-full h-full object-cover"
        />
        <h2 className="absolute inset-0 flex items-center justify-center text-white text-2xl md:text-3xl font-bold bg-black/40">
          Discover Your Favorite Brands
        </h2>
      </div>

      <div className="mb-10 flex justify-center">
        <div className="relative w-full md:w-1/2">
          {/* Search Icon */}
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          
          <input
            type="text"
            placeholder="Search brands..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
          />
        </div>
      </div>

      {/* Brand Grid */}
      {currentBrands.length === 0 ? (
        <p className="text-center py-20 text-gray-500">No brands match your search.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 pb-12">
            {currentBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

          {/* Pagination Info */}
          <p className="text-sm text-gray-500 mt-4 text-center">
            Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, filteredBrands.length)} of {filteredBrands.length} brands
          </p>
        </>
      )}
    </div>
  );
}