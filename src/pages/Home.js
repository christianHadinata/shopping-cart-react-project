import React from "react";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [product, setProduct] = useState([]);

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
        <div className="min-h-screen w-11/12 bg-black">
          <div className="flex flex-wrap justify-items-center text-center"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
