import React, { useEffect, useState } from "react";
import { Section, SectionTitle } from "../styles/SectionStyle";
import ProductCardList from "../components/product/ProductCardList";
import { getRecommend } from "../api/main";

export default function RecommendSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchRecommend = async () => {
      try {
        const data = await getRecommend();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecommend();
  }, []);

  return (
    <Section>
      <SectionTitle>MD추천상품</SectionTitle>
      <ProductCardList data={products} />
    </Section>
  );
}
