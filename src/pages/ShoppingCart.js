import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const [items, setItems] = useState([]);
  const [price, setPrice] = useState();

  useEffect(() => {
    loadItems();
  }, []);

  let totalPrice = 0;

  const loadItems = async () => {
    const result = await axios.get("http://localhost:5000/orderCart");
    setItems(result.data);
    result.data.map((item) => {
      totalPrice += item.count * item.price;
    });
    setPrice(totalPrice);
  };

  const setPlus = async (count, id, title, price, image) => {
    count += 1;
    const order = { title, price, count, image, id };
    await axios.put(`http://localhost:5000/orderCart/${id}`, order);
    loadItems();
  };

  const setMinus = async (count, id, title, price, image) => {
    count -= 1;
    const order = { title, price, count, image, id };
    await axios.put(`http://localhost:5000/orderCart/${id}`, order);
    loadItems();
  };

  const setChange = async (count, id, title, price, image, value) => {
    count = value;
    const order = { title, price, count, image, id };
    await axios.put(`http://localhost:5000/orderCart/${id}`, order);
    loadItems();
  };

  const handleRemove = async (id) => {
    await axios.delete(`http://localhost:5000/orderCart/${id}`);
    loadItems();
  };

  return (
    <div className="min-h-screen bg-blue-50 pt-8">
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex-col flex-wrap justify-center items-center text-center w-1/3">
          <h1 className="text-5xl text-black">Shopping Cart :</h1>
          {items.map((item, id) => {
            return (
              <div className="h-32  mt-10 bg-white ">
                <div className="flex ">
                  <div className="w-32 h-32">
                    <img
                      src={item.image}
                      alt="image not found"
                      className="w-32 h-32"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex-col">
                      <h1> {item.title} </h1>
                      <div className="flex justify-center items-center">
                        <button
                          className="w-6 h-6"
                          onClick={() => {
                            setMinus(
                              item.count,
                              item.id,
                              item.title,
                              item.price,
                              item.image
                            );
                          }}
                        >
                          <img src="minusIcon.png" alt="minus" />
                        </button>
                        <input
                          type="text"
                          className="w-10 text-center"
                          value={item.count}
                          // onChange={(e) => {
                          //   setChange(
                          //     item.count,
                          //     item.id,
                          //     item.title,
                          //     item.price,
                          //     item.image,
                          //     e.target.value
                          //   );
                          // }}
                        ></input>
                        <button
                          className="w-6 h-6"
                          onClick={() => {
                            setPlus(
                              item.count,
                              item.id,
                              item.title,
                              item.price,
                              item.image
                            );
                          }}
                        >
                          <img src="plusIcon.png" alt="plus" />
                        </button>
                      </div>
                      <h2>${item.price * item.count}</h2>
                      <button
                        className="rounded-full bg-red-500 text-white p-1"
                        onClick={() => {
                          handleRemove(item.id);
                        }}
                      >
                        <h2>remove</h2>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="text-3xl pt-10">Total Price: ${price}</div>
          <Link to="/" className="text-blue-600 underline text-2xl">
            back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
