import React from "react";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [product, setProduct] = useState([]);
  const [addItem, setAddItem] = useState();

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products/");
        const data = await response.json();
        setIsLoading(false);
        setProduct(data);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
      }
    };
    getProduct();
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen bg-blue-50 pt-8">
      <div className="min-h-screen flex justify-center items-center">
        <div className="min-h-screen w-11/12">
          <div className="flex flex-wrap justify-items-center text-center">
            {product.map((item) => {
              const { id, category, description, image, price, title } = item;
              return (
                <div
                  key={id}
                  className="text-black p-20 md:w-1/3 flex justify-center text-center items-center "
                >
                  <div className="bg-white items-center text-center justify-center w-96 h-96 pt-10">
                    <div className="flex justify-center  text-center items-center ">
                      <img src={image} alt="image" className="w-36 h-36" />
                    </div>
                    <div className="flex justify-center  text-center items-center ">
                      <h1 className="text-xs md:text-xl w-32 md:w-64 md:h-14 mt-5 mb-1 md:mt-8 text-ellipsis overflow-hidden">
                        {title}
                      </h1>
                    </div>
                    <h2 className="text-xl">${price}</h2>
                    <button
                      onClick={() => {
                        setAddItem(item);
                        alert("item added");
                      }}
                    >
                      <h2 className="rounded-full bg-green-500 p-2 mt-3 font-sans">
                        Add to cart
                      </h2>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {addItem ? console.log(addItem) : console.log("item not clicked")}
        </div>
      </div>
    </div>
  );
};

export default Home;
