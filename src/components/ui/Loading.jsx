import styled from "@emotion/styled";
import { SyncLoader } from "react-spinners";
import { useLoadingStore } from "../../stores/useLoadingStore";

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-height: 100vh;
  background-color: #f9f9f9;

  position: ${({ full }) => (full ? "fixed" : "relative")};
  top: 0;
  left: 0;
  width: ${({ full }) => (full ? "100vw" : "100%")};
  height: ${({ full }) => (full ? "100vh" : "auto")};
  z-index: ${({ full }) => (full ? 99999 : "auto")};
`;

const Message = styled.h2`
  margin-top: 30px;
  color: #333;
  font-weight: 600;
  font-size: 1.1rem;
`;

const Loading = ({ full = false }) => {
  const { loadingCount, message } = useLoadingStore();

  const loading = loadingCount > 0;

  if (!loading) return null;

  return (
    <LoadingWrapper full={full}>
      <SyncLoader color="#70A9A1" size={12} margin={5} />
      <Message>{message}</Message>
    </LoadingWrapper>
  );
};

export default Loading;
