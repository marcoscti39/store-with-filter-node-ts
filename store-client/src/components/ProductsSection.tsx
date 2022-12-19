import ProductItem from "./ProductItem";
import ProductsLayout from "./ProductsLayout";
import AsideFilter from "./AsideFilter";

import { CgMenuGridR as Layout2Icon } from "react-icons/cg";
import { FiMenu as Layout1Icon } from "react-icons/fi";
import { useState } from "react";
import { useGetProducts } from "../hooks/useGetProducts";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { insertSearchParamOnUrl } from "../utils/insertSearchParamOnUrl";

export type LayoutStateType = "layout1" | "layout2";

interface ObjectQueryTypes {
  name?: string;
  price?: string;
  sortby?: string;
  company?: string;
}

export const ProductsSection = () => {
  const [layoutState, setLayoutState] = useState<LayoutStateType>("layout1");
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { data: products, isLoading } = useGetProducts();

  const handleSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = { sortby: event.target.value };
    setSearchParams((prev) =>
      insertSearchParamOnUrl(prev, "sortby", event.target.value)
    );

    queryClient.refetchQueries();
  };
  return (
    <>
      <section className="grid grid-cols-[230px,1fr] px-12">
        <AsideFilter />
        <div>
          <div className="flex gap-4 align-center p-4">
            <div className="flex gap-2">
              <button
                className={`text-3xl ${
                  layoutState === "layout1"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }  border-[2px] border-black rounded-[7px]`}
                onClick={() => setLayoutState("layout1")}
              >
                <Layout1Icon />
              </button>
              <button
                className={`text-3xl ${
                  layoutState === "layout2"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }  border-[2px] border-black rounded-[7px]`}
                onClick={() => setLayoutState("layout2")}
              >
                <Layout2Icon />
              </button>
            </div>

            <span className="self-center">
              {products?.length} products found
            </span>

            <div className="w-full h-[3px] bg-gray-200 flex-1 self-center" />

            <div className="flex gap-1 self-center">
              <span className="self-center">Sort By</span>
              <select className="py-1 rounded" onChange={handleSortBy}>
                <option value="lowest">Price (lowest)</option>
                <option value="highest">Price (highest)</option>
                <option value="A-Z">Name (A-Z)</option>
                <option value="Z-A">Name (Z-A)</option>
              </select>
            </div>
          </div>
          <ProductsLayout layoutState={layoutState}>
            {isLoading
              ? "Loading..."
              : products?.map((product, index) => (
                  <ProductItem
                    key={index}
                    {...product}
                    layoutState={layoutState}
                  />
                ))}
            {products?.length === 0 && (
              <p>No Products with this specifications</p>
            )}
          </ProductsLayout>
        </div>
      </section>
    </>
  );
};
