import styled from "@emotion/styled";

function Pagination({ currentPage, totalPages, onPageChange }) {
  // 총 페이지 개수만큼 [1, 2, 3, ...] 배열 생성
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // 이전 버튼 클릭
  const handlePrev = () => {
    if (currentPage === 1) return; // 첫 페이지면 이동 막기
    onPageChange(currentPage - 1);
  };

  // 다음 버튼 클릭
  const handleNext = () => {
    if (currentPage === totalPages) return; // 마지막 페이지면 이동 막기
    onPageChange(currentPage + 1);
  };

  return (
    <Wrapper>
      <MoveButton
        type="button"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        이전
      </MoveButton>

      <NumberGroup>
        {pages.map((page) => (
          <PageButton
            key={page}
            type="button"
            onClick={() => onPageChange(page)} // 클릭한 페이지로 이동 요청
            $active={currentPage === page} // 현재 페이지면 스타일 변경
          >
            {page}
          </PageButton>
        ))}
      </NumberGroup>

      <MoveButton
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        다음
      </MoveButton>
    </Wrapper>
  );
}

export default Pagination;

const Wrapper = styled.nav`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const PageList = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const NavButton = styled.button`
  min-width: 42px;
  height: 32px;
  padding: 0 11px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;

  &:disabled {
    opacity: ${({ theme }) => theme.opacity.disabled};
    cursor: not-allowed;
  }
`;

const PageButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 4px;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.white};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.black};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:disabled {
    opacity: ${({ theme }) => theme.opacity.disabled};
    cursor: not-allowed;
  }
`;

/*
사용법

<Pagination
  currentPage={1}
  totalPages={5}
  onPageChange={(page) => console.log(page)}
/>

설명
- 페이지 이동 UI 컴포넌트
- 상태는 부모에서 관리하고, 클릭 시 onPageChange로 전달
*/
