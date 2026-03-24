import styled from "@emotion/styled";
import { SyncLoader } from "react-spinners";

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #f9f9f9; /* NatureGlow 테마에 맞춰 밝은 톤 권장 */
`;

const Message = styled.h2`
  margin-top: 30px;
  color: #333;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.05em;
`;

const Loading = ({ loading, message = "잠시만 기다려주세요..." }) => {
  if (!loading) return null;

  return (
    <LoadingWrapper>
      <SyncLoader
        color="#70A9A1" // NatureGlow의 그린 테마 색상
        loading={loading}
        size={12} // SyncLoader에 적합한 구슬 크기
        margin={5} // 구슬 간의 간격
        speedMultiplier={0.7} // 로딩 속도 조절
      />
      <Message>{message}</Message>
    </LoadingWrapper>
  );
};

export default Loading;
