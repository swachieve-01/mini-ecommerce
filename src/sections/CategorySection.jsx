import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import theme from "../styles/theme";
import { getCategories } from "../api/main";
import { useNavigate } from "react-router-dom";

// 메인 카테고리 영역
const CategoryImage = styled.div`
  width: 100%;
  max-width: 160px;
  height: 160px;
  position: relative;
  margin-top: ${theme.spacing.titleBlock};

  &:not(:first-of-type)::before {
    content: "";
    position: absolute;
    left: -10px;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 80%;
    background: #e2e2e2;
  }

  &:hover img {
    transform: scale(1.2);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// 메인 카테고리 이미지
const CategoryItem = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;
`;

const CategoryList = styled.div`
  display: flex;
  gap: 9px;
  justify-content: center;
`;

const CategoryName = styled.p`
  margin-top: 8px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-align: center;
`;

export default function CategorySection() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const categoryMap = {
    skincare: "skin",
    care: "hairbody",
  };

  const handleClick = (id) => {
    const normalized = String(id).toLowerCase().trim();
    const mapped = categoryMap[normalized] || normalized;

    navigate(`/category/${mapped}`);
  };

  return (
    <CategoryList>
      {categories.map((item) => {
        const id = item.categoryId;
        return (
          <CategoryImage key={id} onClick={() => handleClick(id)}>
            <CategoryItem src={item.imageUrl} alt={item.name} />
            <CategoryName>{item.name}</CategoryName>
          </CategoryImage>
        );
      })}
    </CategoryList>
  );
}
