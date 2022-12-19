import React, { useRef, useState } from "react";
import { useQueryClient } from "react-query";
import {
  URLSearchParamsInit,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { insertSearchParamOnUrl } from "../utils/insertSearchParamOnUrl";

export interface FilterQueryParamsTypes {
  name?: string;
  price?: string;
}

const insertOnTimeout = (cb: () => void) => {
  return setTimeout(() => {
    cb();
  }, 1000);
};

const AsideFilter = () => {
  const priceFilterValueRef = useRef<HTMLInputElement>(null);
  const [priceFilterTimeoutID, setPriceFilterTimeoutID] = useState(0);
  const [nameInputTimeoutID, setNameInputTimeoutID] = useState(0);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    queryClient.refetchQueries();
  }, [document.location.search]);

  const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (nameInputTimeoutID === 0) {
      const timeout = insertOnTimeout(() => {
        setSearchParams((prev) =>
          insertSearchParamOnUrl(prev, "name", event.target.value)
        );
      });

      setNameInputTimeoutID(timeout);
      return;
    }

    clearTimeout(nameInputTimeoutID);

    const timeout = insertOnTimeout(() => {
      setSearchParams((prev) =>
        insertSearchParamOnUrl(prev, "name", event.target.value)
      );
    });

    setNameInputTimeoutID(timeout);
  };

  const handleFilteringByPrice = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (priceFilterTimeoutID === 0) {
      const timeout = insertOnTimeout(() => {
        setSearchParams((prev) =>
          insertSearchParamOnUrl(prev, "price", event.target.value)
        );
      });
      setPriceFilterTimeoutID(timeout);
      return;
    }
    clearTimeout(priceFilterTimeoutID);

    const timeout = insertOnTimeout(() => {
      setSearchParams((prev) =>
        insertSearchParamOnUrl(prev, "price", event.target.value)
      );
    });

    setPriceFilterTimeoutID(timeout);
  };

  const handleFilterByCompany = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchParams((prev) =>
      insertSearchParamOnUrl(prev, "company", event.target.value)
    );
  };

  const clearSearchParams = () => {
    navigate("/products");
    queryClient.refetchQueries();
  };

  return (
    <aside className="w-full h-full ">
      <div className="flex gap-6 flex-col sticky top-0 pt-4">
        <input
          type="search"
          placeholder="search..."
          className="flex-1 bg-gray-200 p-1 rounded"
          onChange={handleInputName}
        />
        <div className="flex flex-col gap-1">
          <strong className="font-semibold tracking-wide">Company</strong>
          <select className="py-1" onChange={handleFilterByCompany}>
            <option value="all">All</option>
            <option value="marcos">Marcos</option>
            <option value="liddy">Liddy</option>
            <option value="ikea">Ikea</option>
            <option value="caressa">Caressa</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <strong className="font-semibold tracking-wide">Price</strong>
          <span>$ {priceFilterValueRef.current?.value}</span>
          <input
            type="range"
            max={200}
            min={10}
            step={5}
            defaultValue="200"
            onChange={handleFilteringByPrice}
            ref={priceFilterValueRef}
          />
        </div>
        <button
          className="bg-blue-500 mt-2 text-white font-semibold w-[max-content] px-4 rounded capitalize self-center py-2"
          onClick={clearSearchParams}
        >
          clear filters
        </button>
      </div>
    </aside>
  );
};

export default AsideFilter;
