import { useQuery } from "react-query";
import { fetchProducts } from "../fetch/fetchProducts";

export const useGetProducts = () => {
  return useQuery("getProducts", fetchProducts);
};
