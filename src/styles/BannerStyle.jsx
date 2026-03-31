import styled from "@emotion/styled";

// 배너 영역 틀
export const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => props.height};
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0);
    transition: background 0.3s ease;
    z-index: 1;
  }

  @media (max-width: 768px) {
    &:hover::after {
      background: rgba(255, 255, 255, 0.25); //
    }
  }
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
