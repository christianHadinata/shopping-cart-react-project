import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

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

  // const setPlus = () => {
  //   item.coun
  // }

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
                            console.log("a");
                          }}
                        >
                          <img src="minusIcon.png" alt="minus" />
                        </button>
                        <input
                          className="w-10 text-center"
                          value={item.count}
                          // onChange={() => {
                          //   setChange();
                          // }}
                        ></input>
                        <button
                          className="w-6 h-6"
                          onClick={() => {
                            console.log("a");
                          }}
                        >
                          <img src="plusIcon.png" alt="plus" />
                        </button>
                      </div>
                      <h2>{item.price}</h2>
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
          <div className="text-3xl pt-10">Total Price: ${price.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
