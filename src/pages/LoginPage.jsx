import { useState } from "react";
import styled from "@emotion/styled";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../api";
import logoImage from "../assets/images/푸터 로고.png";
import { useAuthStore } from "../stores/useAuthStore";
import { LoginInput } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  /* 저장된 아이디 불러오기 */
  const savedLoginId = localStorage.getItem("savedLoginId") || "";

  /* 로그인 상태 */
  const [loginId, setLoginId] = useState(savedLoginId);
  const [password, setPassword] = useState("");
  const [isRememberId, setIsRememberId] = useState(Boolean(savedLoginId));
  const [errorMessage, setErrorMessage] = useState("");

  /* 아이디 입력 */
  const handleLoginIdChange = (e) => {
    setLoginId(e.target.value);

    /* 입력 시 에러 초기화 */
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  /* 비밀번호 입력 */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    /* 입력 시 에러 초기화 */
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  /* 아이디 저장 체크 */
  const handleRememberIdChange = (e) => {
    setIsRememberId(e.target.checked);
  };

  /* 로그인 요청 */
  const handleSubmit = async (e) => {
    e.preventDefault();

    /* 빈 값 검사 */
    if (!loginId.trim() || !password.trim()) {
      setErrorMessage("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const result = await login(loginId, password);

      /* 로그인 실패 */
      if (!result.success) {
        setErrorMessage(
          result.message || "아이디 또는 비밀번호를 다시 확인해주세요.",
        );
        return;
      }

      /* 아이디 저장 */
      if (isRememberId) {
        localStorage.setItem("savedLoginId", loginId);
      } else {
        localStorage.removeItem("savedLoginId");
      }

      /* 로그인 상태 저장 */
      useAuthStore.getState().login(result);

      alert("로그인 성공!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("로그인 에러:", error);
      setErrorMessage(error.message || "로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <LoginPageWrapper>
      <LoginPageInner>
        {/* 로고 영역 */}
        <LoginLogoSection>
          <LoginLogoImage src={logoImage} alt="NatureGlow 로고" />
          <LoginDescriptionText>
            회원가입하시면 다양한 혜택 서비스를 누리실 수 있습니다.
          </LoginDescriptionText>
        </LoginLogoSection>

        {/* 로그인 박스 */}
        <LoginCard>
          <LoginTitle>로그인</LoginTitle>

          {/* 로그인 폼 */}
          <LoginForm onSubmit={handleSubmit}>
            {/* 입력 영역 */}
            <LoginInputArea>
              <LoginInput
                idValue={loginId}
                pwValue={password}
                onIdChange={handleLoginIdChange}
                onPwChange={handlePasswordChange}
                width="100%"
              />
            </LoginInputArea>

            {/* 아이디 저장 */}
            <LoginOptionRow>
              <RememberIdLabel>
                <RememberIdCheckbox
                  type="checkbox"
                  checked={isRememberId}
                  onChange={handleRememberIdChange}
                />
                <RememberIdText>아이디 저장</RememberIdText>
              </RememberIdLabel>
            </LoginOptionRow>

            {/* 에러 메시지 */}
            <LoginErrorArea>
              {errorMessage ? (
                <LoginErrorText>{errorMessage}</LoginErrorText>
              ) : null}
            </LoginErrorArea>

            {/* 로그인 버튼 */}
            <LoginButtonRow>
              <Button type="submit" width="100%" height="48px" radius="xxl">
                로그인
              </Button>
            </LoginButtonRow>

            {/* 하단 링크 */}
            <LoginLinkRow>
              <LoginPageLink to="/signup" state={{ from }}>
                회원가입
              </LoginPageLink>{" "}
              <LoginLinkDivider>|</LoginLinkDivider>
              <LoginPageLink to="/find-id">아이디 찾기</LoginPageLink>
              <LoginLinkDivider>|</LoginLinkDivider>
              <LoginPageLink to="/find-password">비밀번호 찾기</LoginPageLink>
            </LoginLinkRow>
          </LoginForm>
        </LoginCard>
      </LoginPageInner>
    </LoginPageWrapper>
  );
}

/* 전체 페이지 영역 */
const LoginPageWrapper = styled.div`
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
const LoginPageInner = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
`;

/* 로고 영역 */
const LoginLogoSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

/* 로고 이미지 */
const LoginLogoImage = styled.img`
  width: 321px;
  max-width: 100%;
  height: auto;
  display: block;

  @media (max-width: 768px) {
    width: 240px;
  }
`;

/* 설명 텍스트 */
const LoginDescriptionText = styled.p`
  margin: 1px 0 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: 1.4;
  text-align: center;
`;

/* 로그인 카드 */
const LoginCard = styled.section`
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
const LoginTitle = styled.h1`
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

/* 폼 레이아웃 */
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

/* 인풋 영역 */
const LoginInputArea = styled.div`
  width: 100%;

  > div {
    width: 100%;
  }

  /* LoginInput 내부 제목 숨김 */
  p {
    display: none;
  }
`;

/* 옵션 영역 */
const LoginOptionRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
`;

/* 체크박스 라벨 */
const RememberIdLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

/* 체크박스 */
const RememberIdCheckbox = styled.input`
  width: 18px;
  height: 18px;
  margin: 0;
  accent-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

/* 체크박스 텍스트 */
const RememberIdText = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

/* 에러 영역 */
const LoginErrorArea = styled.div`
  min-height: 44px;
  padding-top: 12px;
`;

/* 에러 텍스트 */
const LoginErrorText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.error || "#d32f2f"};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: 1.5;
`;

/* 버튼 영역 */
const LoginButtonRow = styled.div`
  margin-top: 8px;
`;

/* 링크 영역 */
const LoginLinkRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 35px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 10px;
    margin-top: 24px;
  }
`;

/* 링크 스타일 */
const LoginPageLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

/* 구분자 */
const LoginLinkDivider = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;
