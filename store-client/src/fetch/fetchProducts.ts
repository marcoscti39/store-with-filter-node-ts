import { useSearchParams } from "react-router-dom";

export interface ProductsType {
  name: string;
  price: number;
  company: string;
  rating?: number;
  featured?: boolean;
}

export const fetchProducts = async () => {
  const queryString = document.location.search;
  const response = await fetch(
    `http://localhost:3000/api/v1/get-all-products${queryString}`
  );
  const data: ProductsType[] = await response.json();
  return data;
};
