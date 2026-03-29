import styled from "@emotion/styled";

// 배너 영역 틀
export const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => props.height};
  /* height: 600px; */
`;

// 배너 이미지 꽉 채우는
export const BannerImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  object-fit: cover;

  z-index: 1;
`;
