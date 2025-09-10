import { brands, products } from "./dummy";
import type { Brand, Product } from "../types/types";

// Fetch all brands
export const fetchBrands = async (): Promise<Brand[]> =>
  new Promise((resolve) => setTimeout(() => resolve(brands), 200));

// Fetch products, optional filter by brandId
export const fetchProducts = async (brandId?: string): Promise<Product[]> =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          brandId ? products.filter((p) => p.brandId === brandId) : products
        ),
      200
    )
  );

// Fetch single product by id
export const fetchProductById = async (id: string): Promise<Product | undefined> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(products.find((p) => p.id === id)), 200)
  );