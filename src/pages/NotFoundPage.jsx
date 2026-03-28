import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import iconLeaf from "../assets/icons/iconLeaf.png";
import bg404 from "../assets/images/bg404.png";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Page>
      <Background src={bg404} alt="" />

      <Overlay>
        <Content>
          {/* 상단 영역 */}
          <TopGroup>
            <LeafIcon src={iconLeaf} alt="나뭇잎 아이콘" />
            <ErrorCode>404</ErrorCode>
            <Title>페이지를 찾을 수 없습니다.</Title>
          </TopGroup>

          {/* 하단 영역 */}
          <BottomGroup>
            <Description>
              죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
              <br />
              입력하신 주소가 올바른지 다시 한 번 확인해 주세요.
            </Description>

            <Button
              width="288px"
              height="62px"
              radius="pill"
              fontSize="xxl"
              fontWeight="medium"
              textColor="white"
              onClick={handleGoHome}
            >
              홈으로 돌아가기 {">"}
            </Button>
          </BottomGroup>
        </Content>
      </Overlay>
    </Page>
  );
}

/* 전체 페이지 */
const Page = styled.main`
  position: relative;
  width: 100%;
  min-height: 100dvh;
  overflow: hidden;
`;

/* 배경 이미지 */
const Background = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

/* 오버레이 */
const Overlay = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  padding: 40px 20px;
  background-color: rgba(255, 255, 255, 0.4);
  box-sizing: border-box;
`;

/* 전체 콘텐츠 */
const Content = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

/* 상단 그룹 */
const TopGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 43px;
`;

/* 하단 그룹 */
const BottomGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 58px;
  margin-top: 48px;
`;

/* 아이콘 */
const LeafIcon = styled.img`
  width: 56px;
  height: 56px;
  object-fit: contain;
`;

/* 404 숫자 */
const ErrorCode = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 100px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: 1;
`;

/* 제목 */
const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 26px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: 1;
`;

/* 설명 */
const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 26px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: 50px;
  text-align: center;
`;
