import React, { useEffect } from "react";
import ProductDetail from "../../components/Product/ProductDetail";
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../store/api/productApi";
import Navbar from "../../components/Home/Navbar";

const Product = () => {
  const { id } = useParams(); // assuming dynamic routing like /product/:id

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductDetailsQuery(id);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  

  return (
    <>
      <Navbar />
      <ProductDetail product={product?.data} />
    </>
  );
};

export default Product;
