import React from "react";
import { LayoutStateType } from "./ProductsSection";

interface ProductsLayoutProps {
  children: React.ReactNode;
  layoutState: LayoutStateType;
}

const ProductsLayout: React.FunctionComponent<ProductsLayoutProps> = ({
  children,
  layoutState,
}) => {
  return (
    <section
      className={`grid ${
        layoutState === "layout1"
          ? "grid-cols-[repeat(auto-fill,minmax(250px,1fr))]"
          : "grid-cols-1"
      } gap-4 mx-4 flex-1`}
    >
      {children}
    </section>
  );
};

export default ProductsLayout;
