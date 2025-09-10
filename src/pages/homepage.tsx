import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBrands, fetchProducts } from "../data/api";
import BrandCard from "../components/brandCard";
import { Link } from "react-router-dom";
import type { Brand, Product } from "../types/types";

const banners = [
  "/banners/banner1.jpg",
  "/banners/banner2.jpg",
  "/banners/banner3.jpg",
  "/banners/banner4.jpg",
  "/banners/banner5.webp",
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Auto slide every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  const goToSlide = (index: number) => setCurrent(index);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.touches[0].clientX;
    if (diff > 50) {
      nextSlide();
      setTouchStart(null);
    } else if (diff < -50) {
      prevSlide();
      setTouchStart(null);
    }
  };

  // Fetch brands
  const { data: brands, isLoading: loadingBrands, isError: errorBrands } = useQuery<Brand[], Error>({
    queryKey: ["brands"],
    queryFn: () => fetchBrands(),
  });

  // Fetch products
  const { data: products, isLoading: loadingProducts, isError: errorProducts } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
  });

  const topBrands = brands?.slice(0, 4);
  const topProducts = products?.slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Carousel */}
      <div
        ref={slideRef}
        className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden my-8 md:my-10 rounded-lg shadow-md"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {banners.map((banner, index) => (
          <img
            key={index}
            src={banner}
            alt={`banner-${index}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
              current === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 bg-white/70 px-3 py-1 rounded-full shadow hover:bg-white transition"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 bg-white/70 px-3 py-1 rounded-full shadow hover:bg-white transition"
        >
          ›
        </button>

        {/* Bullets */}
        <div className="absolute bottom-3 right-3 flex gap-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full transition ${
                current === idx ? "bg-red-600" : "bg-white/70 hover:bg-red-500"
              }`}
            ></button>
          ))}
</div>
      </div>

      {/* Brand Section */}
      <section className="mb-12 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">Shop by Brand</h2>
        {loadingBrands ? (
          <p>Loading brands...</p>
        ) : errorBrands ? (
          <p className="text-red-500">Failed to load brands</p>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-10">
              {topBrands?.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
            <Link
              to="/brands"
              className="inline-block mt-6 text-sm sm:text-base font-medium text-red-600 hover:underline"
            >
              See All Brands →
            </Link>
          </>
        )}
      </section>

      {/* Promo Section */}
      <section className="mb-12 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">Special Offers</h2>
        {loadingProducts ? (
          <p>Loading products...</p>
        ) : errorProducts ? (
          <p className="text-red-500">Failed to load products</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {topProducts?.map((p) => (
              <Link
                to={`/product/${p.id}`}
                key={p.id}
                className="relative group bg-white shadow-sm hover:shadow-md transition rounded-lg overflow-hidden"
              >
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
                  Promo
                </div>
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-3">
                  <p className="text-sm sm:text-base font-medium">{p.name}</p>
                  <p className="text-gray-600 text-xs sm:text-sm">${p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}