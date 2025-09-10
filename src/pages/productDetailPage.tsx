import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchProductById, fetchBrands, fetchProducts } from "../data/api";
import type { Product, Brand, CartItem } from "../types/types";
import ProductCard from "../components/productCard";
import { useCart } from "../context/cartContext";

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Fetch product detail
  const { data: product, isLoading, isError } = useQuery<Product | undefined>({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId!),
    enabled: !!productId,
  });

  // Fetch all brands
  const { data: brands } = useQuery<Brand[]>({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  // Fetch all products for related products
  const { data: allProducts } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
  });

  if (isLoading)
    return <p className="text-center py-20 text-gray-500">Loading product...</p>;
  if (isError || !product)
    return <p className="text-center py-20 text-red-500">Product not found</p>;

  const brand = brands?.find((b) => b.id === product.brandId);

  // Related products from same brand
  const relatedProducts = allProducts
    ?.filter((p) => p.brandId === product.brandId && p.id !== product.id)
    .slice(0, 4);

  // Dummy multiple images
  const productImages = [product.imageUrl, product.imageUrl, product.imageUrl, product.imageUrl];

  // Sample sizes
  const availableSizes = ["38", "39", "40", "41", "42", "43"];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
      brandId: product.brandId,
      selectedSize,
    };

    addToCart(cartItem);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Back Link */}
      <Link
        to={brand ? `/products/${brand.id}` : "/products"}
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        ← Back to {brand ? brand.name : "Products"}
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Images */}
        <div className="flex flex-col gap-4 w-full md:w-96 flex-shrink-0">
          <div className="relative">
            <img
              src={productImages[0]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg shadow"
            />
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded z-10">
              Best Seller
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            {productImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                className="w-20 h-20 object-cover rounded cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          {brand && <p className="text-gray-500">{brand.name}</p>}
          <p className="text-2xl font-semibold">${product.price}</p>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-green-600 font-medium">In Stock</p>
          <p className="flex items-center gap-2">Rating: ★★★★☆ (12 reviews)</p>

          {/* Size Selector */}
          <div className="mt-4">
            <p className="font-medium mb-2">Select Size:</p>
            <div className="flex gap-2 flex-wrap">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size ? "bg-red-600 text-white" : "bg-white"
                  } hover:bg-red-500 hover:text-white transition`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mt-6">
            <button
              onClick={handleAddToCart}
              className="w-full px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-6">
            Other products by {brand?.name}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}