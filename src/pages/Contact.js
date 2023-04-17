import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="min-h-screen bg-blue-50 pt-8">
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex-col">
          <h1 className="text-2xl">Contact Us:</h1>
          <h2>08987848228</h2>
          <Link to="/">
            <h2 className="underline text-blue-600">back to home</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
