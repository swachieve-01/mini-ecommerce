import styled from "@emotion/styled";
import { termsData } from "../../data/termsData";

function TermsContent({ termId }) {
  const selectedTerm = termsData.find((term) => term.id === termId);

  if (!selectedTerm) {
    return <ContentBox>약관 내용을 찾을 수 없습니다.</ContentBox>;
  }

  return (
    <ContentBox>
      <ContentText>{selectedTerm.content}</ContentText>
    </ContentBox>
  );
}

export default TermsContent;

const ContentBox = styled.div`
  width: 460px;
  height: 435px;
  padding: ${({ theme }) => theme.spacing.lg};
  border: ${({ theme }) => theme.border.thick};
  border-radius: ${({ theme }) => theme.radius.lg};
  background-color: ${({ theme }) => theme.colors.bg};
  overflow-y: auto;
`;

const ContentText = styled.p`
  white-space: pre-line;
  text-align: left;
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMain};
`;

/*
사용법

<TermsContent
  termId={"service"}   // "service" | "privacy" | "marketing"
/>

설명
- 약관 내용 표시 컴포넌트
- termId 값에 따라 해당 약관 데이터를 찾아서 화면에 출력
- 존재하지 않는 id일 경우 안내 문구 표시
*/
