import React from "react";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [product, setProduct] = useState([]);
  const [addItem, setAddItem] = useState();

  let count = 1;
  const addCart = async (itemTitle, itemPrice, image) => {
    let isExist = false;
    const result = await axios.get("http://localhost:5000/orderCart");
    if (result.data.length === 0) {
      const order = {
        title: itemTitle,
        price: itemPrice,
        count: count,
        image: image,
      };
      axios.post("http://localhost:5000/orderCart", order);
    } else {
      result.data.map((orderItem) => {
        if (itemTitle === orderItem.title) {
          orderItem.count += 1;
          const order = {
            title: itemTitle,
            price: itemPrice,
            count: orderItem.count,
            image: image,
          };
          axios.put(`http://localhost:5000/orderCart/${orderItem.id}`, order);
          isExist = true;
        }
      });
      if (isExist == false) {
        const order = {
          title: itemTitle,
          price: itemPrice,
          count: count,
          image: image,
        };
        axios.post("http://localhost:5000/orderCart", order);
      }
    }
  };

  const setFilter = async (categories) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5001/items?category=${categories}`
      );
      const data = await response.json();
      <Link to={`/items?category=${categories}`}></Link>;
      setIsLoading(false);
      setProduct(data);
    } catch (e) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5001/items");
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
          <div className="flex items-center text-center justify-center mt-10">
            <button
              className="mx-5 px-4 p-2 bg-slate-700 text-white rounded-full"
              onClick={async () => {
                setIsLoading(true);
                try {
                  const response = await fetch("http://localhost:5001/items");
                  const data = await response.json();
                  setIsLoading(false);
                  setProduct(data);
                } catch (e) {
                  setIsLoading(false);
                  setIsError(true);
                }
              }}
            >
              All Items
            </button>
            <button
              className="mx-5 px-4 p-2 bg-slate-700 text-white rounded-full"
              onClick={() => {
                setFilter("electronics");
              }}
            >
              Electronics
            </button>
            <button
              className="mx-5 px-4 p-2 bg-slate-700 text-white rounded-full"
              onClick={() => {
                setFilter("jewelery");
              }}
            >
              Jewelery
            </button>
            <button
              className="mx-5 px-4 p-2 bg-slate-700 text-white rounded-full"
              onClick={() => {
                setFilter("men's clothing");
              }}
            >
              Men's Clothing
            </button>
            <button
              className="mx-5 px-4 p-2 bg-slate-700 text-white rounded-full"
              onClick={() => {
                setFilter("women's clothing");
              }}
            >
              Women's Clothing
            </button>
          </div>
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
                    <h3>({category})</h3>
                    <h2 className="text-xl">${price}</h2>
                    <button
                      onClick={() => {
                        addCart(title, price, image);
                        alert("item added");
                      }}
                    >
                      <h2 className="rounded-full bg-green-400 p-2 mt-3 font-sans px-3">
                        Add to cart
                      </h2>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
