import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const Products = () => {
  let url = `${BACKEND_URL}/api/v1/products`;
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const responce = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      const value = await responce.json();

      setProductList(value.data);
    }
    getProducts();
  }, []);

  return (
    <>
      <section className="w-full h-auto flex justify-center items-center">
        <div className="h-full lg:w-4/5">
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 p-2 gap-1 mb-3">
            {productList.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
