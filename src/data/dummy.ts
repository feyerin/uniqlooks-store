import type { Brand, Product } from "../types/types";

export const brands: Brand[] = [
  {
    id: "1",
    name: "Nike",
    logoUrl: "https://logo.clearbit.com/nike.com",
  },
  {
    id: "2",
    name: "Adidas",
    logoUrl: "https://logo.clearbit.com/adidas.com",
  },
  {
    id: "3",
    name: "Puma",
    logoUrl: "https://logo.clearbit.com/puma.com",
  },
  {
    id: "4",
    name: "New Balance",
    logoUrl: "https://logo.clearbit.com/newbalance.com",
  },
  {
    id: "5",
    name: "Reebok",
    logoUrl: "https://logo.clearbit.com/reebok.com",
  },
  {
    id: "6",
    name: "Asics",
    logoUrl: "https://logo.clearbit.com/asics.com",
  },
  {
    id: "7",
    name: "Converse",
    logoUrl: "https://logo.clearbit.com/converse.com",
  },
  {
    id: "8",
    name: "Vans",
    logoUrl: "https://logo.clearbit.com/vans.com",
  },
  {
    id: "9",
    name: "Under Armour",
    logoUrl: "https://logo.clearbit.com/underarmour.com",
  },
  {
    id: "10",
    name: "Fila",
    logoUrl: "https://logo.clearbit.com/fila.com",
  },
  {
    id: "11",
    name: "Champion",
    logoUrl: "https://logo.clearbit.com/champion.com",
  },
  {
    id: "12",
    name: "Lacoste",
    logoUrl: "https://logo.clearbit.com/lacoste.com",
  },
  {
    id: "13",
    name: "Jordan",
    logoUrl: "https://logo.clearbit.com/jordan.com",
  },
  {
    id: "14",
    name: "The North Face",
    logoUrl: "https://logo.clearbit.com/thenorthface.com",
  },
  {
    id: "15",
    name: "Patagonia",
    logoUrl: "https://logo.clearbit.com/patagonia.com",
  },
  {
    id: "16",
    name: "Columbia",
    logoUrl: "https://logo.clearbit.com/columbia.com",
  },
];

const DUMMY_IMAGE = "/shoes/shoes.jpg";

export const products: Product[] = [
  ...brands.flatMap((brand) =>
    Array.from({ length: 20 }, (_, i) => ({
      id: `${brand.id}-${i + 1}`,
      brandId: brand.id,
      name: `${brand.name} Product ${i + 1}`,
      price: Math.floor(Math.random() * 200) + 50,
      imageUrl: DUMMY_IMAGE,
      description: `Deskripsi untuk ${brand.name} Product ${i + 1}`,
    }))
  ),
];