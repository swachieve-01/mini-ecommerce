import React, { useEffect, useState } from "react";
import { Section, SectionTitle } from "../styles/SectionStyle";
import ProductCardList from "../components/product/ProductCardList";
import { getBestProducts } from "../api/main";
import { useLoadingStore } from "../stores/useLoadingStore";

export default function BestSection() {
  const [products, setProducts] = useState([]);
  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        startLoading();
        const result = await getBestProducts();

        const normalizedData = result.map((item) => ({
          ...item,
          id: item.productId || item.id,
        }));

        setProducts(normalizedData);
      } catch (error) {
        console.error(error);
      } finally {
        stopLoading();
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
