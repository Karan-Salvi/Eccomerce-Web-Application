import Brandcard from "./Brandcard";

const Product = () => {
  const productList = [
    {
      id: 1,
      name: "Western Dress",
      imagePath: "./images/product1.jpg",
      minDiscount: 50,
      maxDiscount: 80,
    },
    {
      id: 2,
      name: "T-shirts",
      imagePath: "./images/product2.jpg",
      minDiscount: 40,
      maxDiscount: 80,
    },
    {
      id: 3,
      name: "T-shirts",
      imagePath: "./images/product3.jpg",
      minDiscount: 50,
      maxDiscount: 80,
    },
    {
      id: 4,
      name: "shirts",
      imagePath: "./images/product4.jpg",
      minDiscount: 50,
      maxDiscount: 80,
    },
    {
      id: 5,
      name: "shirts",
      imagePath: "./images/product4.jpg",
      minDiscount: 50,
      maxDiscount: 80,
    },
    {
      id: 6,
      name: "shirts",
      imagePath: "./images/product4.jpg",
      minDiscount: 50,
      maxDiscount: 80,
    },
    {
      id: 7,
      name: "shirts",
      imagePath: "./images/product4.jpg",
      minDiscount: 50,
      maxDiscount: 80,
    },
    {
      id: 8,
      name: "shirts",
      imagePath: "./images/product4.jpg",
      minDiscount: 50,
      maxDiscount: 80,
    },
    {
      id: 9,
      name: "shirts",
      imagePath: "./images/product4.jpg",
      minDiscount: 50,
      maxDiscount: 80,
    },
    {
      id: 10,
      name: "shirts",
      imagePath: "./images/product4.jpg",
      minDiscount: 50,
      maxDiscount: 80,
    },
    {
      id: 11,
      name: "shirts",
      imagePath: "./images/product4.jpg",
      minDiscount: 50,
      maxDiscount: 80,
    },
    {
      id: 12,
      name: "shirts",
      imagePath: "./images/product4.jpg",
      minDiscount: 50,
      maxDiscount: 80,
    },
  ];

  return (
    <>
      <section className="w-full h-auto">
        <div className="h-full flex flex-col items-center">
          <h2 className="text-xl font-bold poppins"> Our Popular Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 gap-2">
            {productList.map((product) => (
              <Brandcard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
