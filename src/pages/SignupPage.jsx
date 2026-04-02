import React, { useState } from "react";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { termsData } from "../data/termsData";
import logoImage from "../assets/images/푸터 로고.png";

export default function SignUpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [values, setValues] = useState({
    email: "",
    pw: "",
    pwConfirm: "",
    name: "",
  });

  const [terms, setTerms] = useState({
    service: false,
    privacy: false,
    marketing: false,
  });

  const [readTerms, setReadTerms] = useState({
    service: false,
    privacy: false,
    marketing: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(null);

  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(null);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isEmailValid = isValidEmail(values.email);
  const isPwMatch = values.pw === values.pwConfirm;
  const isPwError = values.pwConfirm && !isPwMatch;

  const allChecked = terms.service && terms.privacy && terms.marketing;

  const canSubmit =
    isEmailValid &&
    values.pw.length >= 8 &&
    isPwMatch &&
    values.name &&
    terms.service &&
    terms.privacy &&
    isEmailChecked &&
    !isEmailDuplicate;

  const handleChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));

    if (key === "email") {
      setIsEmailChecked(false);
      setIsEmailDuplicate(null);
    }
  };

  const handleTermsChange = (key) => {
    if (!readTerms[key]) {
      alert("보기 버튼으로 약관 내용을 먼저 확인해주세요.");
      return;
    }

    setTerms((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAllTerms = () => {
    if (!readTerms.service || !readTerms.privacy) {
      alert("필수 약관을 먼저 확인해주세요.");
      return;
    }

    const newValue = !allChecked;

    setTerms({
      service: newValue,
      privacy: newValue,
      marketing: newValue,
    });
  };

  const openModal = (termId) => {
    const foundTerm = termsData.find((term) => term.id === termId);
    setSelectedTerm(foundTerm || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTerm(null);
  };

  const handleConfirmTerm = () => {
    if (selectedTerm) {
      setReadTerms((prev) => ({
        ...prev,
        [selectedTerm.id]: true,
      }));

      setTerms((prev) => ({
        ...prev,
        [selectedTerm.id]: true,
      }));
    }

    handleCloseModal();
  };

  const handleCheckEmail = () => {
    if (!isEmailValid) return;

    if (values.email === "test@test.com") {
      setIsEmailDuplicate(true);
    } else {
      setIsEmailDuplicate(false);
    }

    setIsEmailChecked(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!canSubmit) return;

    console.log("회원가입 완료", values);
    alert("회원가입이 완료되었습니다.");
    navigate("/login", {
      state: { from },
      replace: true,
    });
  };

  return (
    <Page>
      <Inner>
        <LogoSection>
          <Logo src={logoImage} alt="NatureGlow 로고" />
          <Description>
            회원가입하시면 다양한 혜택 서비스를 누리실 수 있습니다.
          </Description>
        </LogoSection>

        <SignupBox>
          <Title>회원가입</Title>

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <EmailRow>
                <Input
                  type="email"
                  placeholder="예) example@email.com"
                  value={values.email}
                  error={values.email && !isEmailValid}
                  onChange={(e) => handleChange("email", e.target.value)}
                />

                <CheckButton
                  type="button"
                  onClick={handleCheckEmail}
                  disabled={!isEmailValid}
                >
                  {isEmailChecked
                    ? isEmailDuplicate
                      ? "중복됨"
                      : "확인됨"
                    : "중복확인"}
                </CheckButton>
              </EmailRow>

              <MessageArea>
                {values.email && !isEmailValid && (
                  <ErrorText>올바른 이메일 형식이 아닙니다.</ErrorText>
                )}

                {isEmailChecked && (
                  <ErrorText match={!isEmailDuplicate}>
                    {isEmailDuplicate
                      ? "이미 사용 중인 이메일입니다."
                      : "사용 가능한 이메일입니다."}
                  </ErrorText>
                )}
              </MessageArea>

              <Input
                type="password"
                placeholder="비밀번호 (8~12자, 영문+숫자+특수문자)"
                value={values.pw}
                error={isPwError}
                onChange={(e) => handleChange("pw", e.target.value)}
              />

              <Input
                type="password"
                placeholder="비밀번호 확인"
                value={values.pwConfirm}
                error={isPwError}
                onChange={(e) => handleChange("pwConfirm", e.target.value)}
              />

              <Input
                type="text"
                placeholder="이름 입력"
                value={values.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />

              <MessageArea>
                {values.pwConfirm && (
                  <ErrorText match={isPwMatch}>
                    {isPwMatch
                      ? "비밀번호가 일치합니다."
                      : "비밀번호가 일치하지 않습니다."}
                  </ErrorText>
                )}
              </MessageArea>
            </InputGroup>

            <PrimaryLine />

            <TermsBox>
              <AllCheck>
                <label>
                  <HiddenCheckbox
                    type="checkbox"
                    checked={allChecked}
                    onChange={handleAllTerms}
                  />
                  <CustomCheckbox checked={allChecked} />
                  전체 동의
                </label>
              </AllCheck>

              <Divider />

              <TermsItem>
                <label>
                  <HiddenCheckbox
                    type="checkbox"
                    checked={terms.service}
                    onChange={() => handleTermsChange("service")}
                  />
                  <CustomCheckbox checked={terms.service} />
                  서비스 이용약관 (필수)
                </label>
                <ViewButton type="button" onClick={() => openModal("service")}>
                  보기
                </ViewButton>
              </TermsItem>

              <Divider />

              <TermsItem>
                <label>
                  <HiddenCheckbox
                    type="checkbox"
                    checked={terms.privacy}
                    onChange={() => handleTermsChange("privacy")}
                  />
                  <CustomCheckbox checked={terms.privacy} />
                  개인정보 처리방침 (필수)
                </label>
                <ViewButton type="button" onClick={() => openModal("privacy")}>
                  보기
                </ViewButton>
              </TermsItem>

              <Divider />

              <TermsItem>
                <label>
                  <HiddenCheckbox
                    type="checkbox"
                    checked={terms.marketing}
                    onChange={() => handleTermsChange("marketing")}
                  />
                  <CustomCheckbox checked={terms.marketing} />
                  마케팅 수신 동의 (선택)
                </label>
                <ViewButton
                  type="button"
                  onClick={() => openModal("marketing")}
                >
                  보기
                </ViewButton>
              </TermsItem>
            </TermsBox>

            <ButtonRow>
              <Button
                type="submit"
                width="100%"
                height="48px"
                radius="xxl"
                disabled={!canSubmit}
              >
                가입하기
              </Button>
            </ButtonRow>
          </Form>
        </SignupBox>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="회원가입 약관동의"
          actions={
            <>
              <ModalCancelButton type="button" onClick={handleCloseModal}>
                취소
              </ModalCancelButton>
              <ModalConfirmButton type="button" onClick={handleConfirmTerm}>
                확인
              </ModalConfirmButton>
            </>
          }
        >
          <TermsContentBox>{selectedTerm?.content}</TermsContentBox>
        </Modal>
      </Inner>
    </Page>
  );
}

/* 전체 페이지 영역 */
const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 100px 20px 80px;
  background-color: ${({ theme }) => theme.colors.background || "#ffffff"};
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 40px 16px 60px;
  }
`;

/* 중앙 정렬 컨테이너 */
const Inner = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
`;

/* 로고 영역 */
const LogoSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

/* 로고 이미지 */
const Logo = styled.img`
  width: 321px;
  max-width: 100%;
  height: auto;
  display: block;

  @media (max-width: 768px) {
    width: 240px;
  }
`;

/* 설명 텍스트 */
const Description = styled.p`
  margin: 1px 0 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: 1.4;
  text-align: center;
`;

/* 회원가입 카드 */
const SignupBox = styled.section`
  width: 100%;
  padding: 56px 34px;
  border-radius: ${({ theme }) => theme.radius.lg || "10px"};
  background-color: rgba(251, 251, 251, 0.66);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 48px 28px;
  }

  @media (max-width: 768px) {
    padding: 36px 20px;
  }
`;

/* 제목 */
const Title = styled.h1`
  margin: 0 0 27px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: 1.2;
  text-align: center;
  letter-spacing: 0.08em;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

/* 폼 */
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

/* 입력 묶음 */
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

/* 이메일 줄 */
const EmailRow = styled.div`
  display: flex;
  gap: 8px;
`;

/* 인풋 */
const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border-radius: ${({ theme }) => theme.radius.xl};
  box-sizing: border-box;
  border: 1px solid
    ${({ error, theme }) => (error ? theme.colors.error : theme.colors.border)};
  background: ${({ theme }) => theme.colors.white};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray400};
    font-size: ${({ theme }) => theme.fontSize.sm};
    opacity: 1;
  }

  &:focus {
    outline: none;
    border-color: ${({ error, theme }) =>
      error ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 1px
      ${({ error, theme }) =>
        error ? theme.colors.error : theme.colors.primary};
  }
`;

/* 중복확인 버튼 */
const CheckButton = styled.button`
  width: 101px;
  height: 48px;
  padding: 0 12px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radius.xl};
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  &:disabled {
    background: ${({ theme }) => theme.colors.gray300};
    cursor: not-allowed;
  }
`;

/* 메시지 영역 */
const MessageArea = styled.div`
  min-height: 18px;
  margin-top: -2px;
  margin-bottom: 2px;
`;

/* 에러/안내 텍스트 */
const ErrorText = styled.p`
  margin: 0;
  padding-left: 4px;
  font-size: 12px;
  line-height: 1.4;
  color: ${({ match, theme }) =>
    match ? theme.colors.green : theme.colors.error};
`;

/* 상단 구분선 */
const PrimaryLine = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.primary};
  opacity: 0.5;
  margin: 18px 0 14px;
`;

/* 약관 영역 */
const TermsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

/* 전체 동의 */
const AllCheck = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.primary};

  label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  span {
    position: relative;
    top: -1px;
  }
`;

/* 숨김 체크 */
const HiddenCheckbox = styled.input`
  display: none;
`;

/* 커스텀 체크 */
const CustomCheckbox = styled.span`
  width: 18px;
  height: 18px;
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  cursor: pointer;
  flex-shrink: 0;

  background: ${({ checked, theme }) =>
    checked ? theme.colors.primary : theme.colors.white};
  transition: all 0.2s ease;

  &::after {
    content: "";
    width: 4px;
    height: 8px;
    border: solid ${({ theme }) => theme.colors.white};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    margin-top: -3px;
    opacity: ${({ checked }) => (checked ? 1 : 0)};
    transition: opacity 0.2s ease;
  }
`;

/* 구분선 */
const Divider = styled.div`
  height: 3px;
  background: ${({ theme }) => theme.colors.gray200};
`;

/* 약관 항목 */
const TermsItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.sm};

  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 6px;
  }

  label span {
    position: relative;
    top: 1px;
  }
`;

/* 보기 버튼 */
const ViewButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  margin-right: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  flex-shrink: 0;

  &::after {
    content: ">";
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

/* 가입 버튼 영역 */
const ButtonRow = styled.div`
  margin-top: 26px;
`;

/* 모달 내용 */
const TermsContentBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  white-space: pre-line;
  word-break: keep-all;
  overflow-wrap: break-word;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.gray800};
`;

/* 모달 하단 버튼 공통 */
const ModalActionButton = styled.button`
  flex: 1;
  height: 44px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.lg};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
`;

/* 모달 취소 */
const ModalCancelButton = styled(ModalActionButton)`
  background: ${({ theme }) => theme.colors.gray200};
  color: ${({ theme }) => theme.colors.gray700};
`;

/* 모달 확인 */
const ModalConfirmButton = styled(ModalActionButton)`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`;
