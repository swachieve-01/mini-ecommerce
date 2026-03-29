import React, { useEffect, useState } from "react";
import { Section, SectionTitle } from "../styles/SectionStyle";
import ProductCardList from "../components/product/ProductCardList";
import { getBestProducts } from "../api/main";

export default function BestSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBestProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Section>
      <SectionTitle>베스트 상품</SectionTitle>
      <ProductCardList data={products} />
    </Section>
  );
}
