
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../../components/ProductList";
import { Product } from "@/types/product";


const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/products") // Ajusta la URL según tu backend
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <ProductList products={products} />
    </div>
  );
};

export default ProductsPage;
