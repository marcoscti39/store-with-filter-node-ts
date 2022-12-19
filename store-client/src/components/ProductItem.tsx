import React from "react";
import { LayoutStateType } from "./ProductsSection";
import { ProductsType } from "../fetch/fetchProducts";

type ProductItemProps = { layoutState: LayoutStateType } & ProductsType;

const ProductItem: React.FC<ProductItemProps> = ({
  layoutState,
  name,
  price,
}) => {
  return (
    <article
      className={`flex gap-2 ${
        layoutState === "layout1" ? "flex-col" : "flex-row"
      }`}
    >
      <div
        className={` bg-blue-400 rounded aspect-video ${
          layoutState === "layout1" ? "w-full" : "w-[300px] "
        }`}
      ></div>

      <div
        className={`flex  ${
          layoutState === "layout1"
            ? "justify-between px-1"
            : "flex-col self-center"
        }`}
      >
        <h2 className={`${layoutState === "layout2" && "text-lg"}`}>{name}</h2>
        <strong className="text-blue-600">$ {price}</strong>
        {layoutState === "layout2" && (
          <button className="bg-yellow-400 rounded py-1 px-2 text-white font-semibold w-[max-content]">
            Details
          </button>
        )}
      </div>
    </article>
  );
};

export default ProductItem;
