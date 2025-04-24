import React from "react";
import CardStack from "../components/CardStack";
import { products } from "./data/products";

export default function App() {
  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <CardStack products={products} />
    </div>
  );
}
