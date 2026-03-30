import React, { useState } from "react";
import styled from "@emotion/styled";
import { Button } from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import TermsContent from "../components/signup/TermsContent";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.bgSoft};
`;

const Card = styled.div`
  width: 420px;
  padding: 30px;
  border-radius: ${({ theme }) => theme.radius.xxl};
  background: ${({ theme }) => theme.colors.bg};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.primaryDark};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const Row = styled.div`
  display: flex;
  height: 48px;
  gap: 8px;
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border-radius: ${({ theme }) => theme.radius.xl};
  box-sizing: border-box;
  border: 2px solid
    ${({ error, theme }) => (error ? theme.colors.error : theme.colors.border)};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray400};
    font-size: ${({ theme }) => theme.fontSize.sm};
    opacity: 1;
  }

  &:focus {
    /* border-color: ${({ error }) => (error ? "#D74040" : "#8fa77e")}; */
    border-color: ${({ error, theme }) =>
      error ? theme.colors.error : theme.colors.primary};
  }
`;

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

  &:disabled {
    background: ${({ theme }) => theme.colors.gray300};
    cursor: not-allowed;
  }
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

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

const ErrorText = styled.p`
  font-size: 12px;
  color: ${({ match, theme }) =>
    match ? theme.colors.green : theme.colors.error};
  padding-left: 16px;
  min-height: 16px;
`;

const TermsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AllCheck = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};

  label {
    display: flex;
    align-items: center;
  }

  span {
    position: relative;
    top: -1px;
  }
`;

const PrimaryLine = styled.div`
  height: 1.3px;
  background: ${({ theme }) => theme.colors.primary};
  opacity: 0.5;
  margin-top: auto;
`;

const Divider = styled.div`
  height: 3px;
  background: ${({ theme }) => theme.colors.gray200};
`;

const TermsItem = styled.div`
  display: flex;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  justify-content: space-between;
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
  span {
    cursor: pointer;
    letter-spacing: -0.5px;
    margin-right: 8px;
    gap: 2px;

    &::after {
      content: ">";
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
  }
`;

export default function SignUpPage() {
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

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState("");

  // 이메일 중복검사 상태
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(null);

  // 유효성 검사
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

    //이메일 바꾸면 중복검사 초기화
    if (key === "email") {
      setIsEmailChecked(false);
      setIsEmailDuplicate(null);
    }
  };

  const handleTermsChange = (key) => {
    setTerms((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAllTerms = () => {
    const newValue = !allChecked;
    setTerms({
      service: newValue,
      privacy: newValue,
      marketing: newValue,
    });
  };

  const openModal = (termId) => {
    setSelectedTerm(termId);
    setModalOpen(true);
  };

  //이메일 중복검사 (임시)
  const handleCheckEmail = () => {
    if (!isEmailValid) return;

    if (values.email === "test@test.com") {
      setIsEmailDuplicate(true);
    } else {
      setIsEmailDuplicate(false);
    }

    setIsEmailChecked(true);
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    console.log("회원가입 완료", values);
  };

  // =========================

  return (
    <Wrapper>
      <Card>
        <Title>회원가입</Title>

        {/* 이메일 */}
        <Row>
          <Input
            placeholder="예) example@email.com"
            value={values.email}
            error={values.email && !isEmailValid}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <CheckButton
            type="button"
            onClick={handleCheckEmail}
            disabled={!isEmailValid}
            success={isEmailChecked && !isEmailDuplicate}
          >
            {isEmailChecked
              ? isEmailDuplicate
                ? "중복됨"
                : "확인됨"
              : "중복확인"}
          </CheckButton>
        </Row>

        {/* 이메일 메시지 */}
        {values.email && !isEmailValid && (
          <ErrorText>올바른 이메일 형식이 아닙니다.</ErrorText>
        )}

        {isEmailChecked && (
          <ErrorText match={!isEmailDuplicate}>
            {isEmailChecked
              ? isEmailDuplicate
                ? "이미 사용 중인 이메일입니다."
                : "사용 가능한 이메일입니다."
              : " "}
          </ErrorText>
        )}

        {/* 비밀번호 */}
        <Input
          type="password"
          placeholder="비밀번호 (8~12자, 영문+숫자+특수문자)"
          value={values.pw}
          error={isPwError}
          onChange={(e) => handleChange("pw", e.target.value)}
        />

        {/* 비밀번호 확인 */}
        <Input
          type="password"
          placeholder="비밀번호 확인"
          value={values.pwConfirm}
          error={isPwError}
          onChange={(e) => handleChange("pwConfirm", e.target.value)}
        />

        {/* 이름 */}
        <Input
          placeholder="이름 입력"
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
          style={{ marginBottom: "8px" }}
        />

        {/* 비밀번호 메시지 */}
        {values.pwConfirm && (
          <ErrorText match={isPwMatch}>
            {isPwMatch
              ? "비밀번호가 일치합니다."
              : "비밀번호가 일치하지 않습니다."}
          </ErrorText>
        )}

        <PrimaryLine />

        {/* 약관 */}
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
            <span onClick={() => openModal("service")}>보기</span>
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
            <span onClick={() => openModal("privacy")}>보기</span>
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
            <span onClick={() => openModal("marketing")}>보기</span>
          </TermsItem>
        </TermsBox>

        {/* 가입 버튼 */}
        <Button
          style={{ borderRadius: "24px" }} // 테마 radius 수정 들어오면 고치기
          width="100%"
          height="50px"
          // radius="xxl"
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          가입하기
        </Button>
      </Card>

      {/* 모달 */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="약관 보기"
      >
        <TermsContent termId={selectedTerm} />
      </Modal>
    </Wrapper>
  );
}
