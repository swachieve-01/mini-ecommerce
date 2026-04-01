import styled from "@emotion/styled";
import { FOOTER_DATA } from "../../data/footerLinks";
import FacebookIcon from "../../assets/icons/FacebookIcon";
import YoutubeIcon from "../../assets/icons/YoutubeIcon";
import BlogIcon from "../../assets/icons/BlogIcon";
import InstagramIcon from "../../assets/icons/InstagramIcon";
import LogoImg from "../../assets/images/푸터 로고.png";

const FooterContainer = styled.footer`
  width: 100%;
  max-width: 1920px;
  min-height: 562px;
  padding: 60px 0 40px;
  background-color: ${(props) => props.theme.colors.bgSoft};
  border-top: 1px solid ${(props) => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;

  @media (max-width: 1280px) {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    min-height: auto;
    padding: 40px 0;
  }
`;

const InnerContainer = styled.div`
  width: 90%;
  max-width: 1167px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 40px;
  justify-content: flex-start;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const LogoImage = styled.img`
  width: 225px;
  height: 90px;
  object-fit: contain;

  /* 반응형 돌입 시 */
  @media (max-width: 1024px) {
    width: 180px;
  }

  @media (max-width: 768px) {
    height: auto;
    width: 150px;
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 284px;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 20px;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 15px;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 1024px) {
    flex-direction: row;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

// 임시 버튼 스타일
const TempButton = styled.div`
  width: 176px;
  height: 44px;
  background-color: ${(props) => props.theme.colors.primary};
  border: 1px solid ${(props) => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.colors.white};
  text-decoration: none;
  cursor: pointer;
  border-radius: ${(props) => props.theme.radius.sm};

  &:hover {
    filter: brightness(0.9);
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  &:not(:first-of-type) {
    border-left: 1px solid #eee;
    padding-left: 20px;
  }

  /* 반응형  */
  @media (max-width: 1024px) {
    border-left: none;
    padding-left: 0;
    align-items: flex-start;
  }

  @media (max-width: 768px) {
    align-items: center;
    width: 100%;
  }
`;

const Title = styled.h3`
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: 700;
  margin-bottom: 25px;
  color: ${(props) => props.theme.colors.primaryDark};
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
    margin-bottom: 15px;
  }
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;
  padding: 0;
`;

const CustomerList = styled(List)`
  gap: 10px;
`;

const ListItem = styled.li`
  list-style: none;
  display: flex;
  gap: 0;
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.colors.primaryDark};

  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
    line-height: 1.5;
    flex-direction: column;
    cursor: pointer;

    &:hover {
      color: ${(props) => props.theme.colors.primary};
      text-decoration: underline;
    }
  }
`;

// ListItem 내부에서 타이틀을 진하게 표시하기 위한 스타일 추가
const InfoItem = styled.li`
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.colors.primaryDark};
  list-style: none;
  text-align: left;

  span {
    font-weight: 700; /* 타이틀 부분 진하게 */
    margin-right: 8px;
  }

  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const StrongTitle = styled.span`
  font-weight: 700;
  margin-right: 8px;
  color: ${(props) => props.theme.colors.primaryDark}; // 테마 색상 적용
`;

const Email = styled.li`
  display: block;
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.colors.primaryDark};
  text-decoration: none;
  text-align: left;
  margin-bottom: 0;
  cursor: pointer;

  span {
    font-weight: 700;
    color: ${(props) => props.theme.colors.pointDark};
    margin-right: 8px;
  }

  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
    line-height: 1.5;
    flex-direction: column;

    &:hover {
      color: ${(props) => props.theme.colors.pointDark};
    }
  }
`;

// 기존 Email 스타일을 InfoItem과 통합하거나 유지
const EmailItem = styled(InfoItem)`
  margin-top: 5px;
`;

const CircleButtonList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-top: 60px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 20px;
    margin-top: 40px;
  }
`;

const CircleButton = styled.div`
  width: 47px;
  height: 47px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
    filter: brightness(1.1);
  }
`;

const SNS_ICONS = {
  Instagram: <InstagramIcon />,
  Youtube: <YoutubeIcon />,
  facebook: <FacebookIcon />,
  blog: <BlogIcon />,
};

const Copyright = styled.div`
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  width: 100%;
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.md};
  color: ${(props) => props.theme.colors.textSub};

  span {
    font-weight: 700;
  }
`;

const { customerService, support, companyInfo, shopping, sns } = FOOTER_DATA;

export default function Footer() {
  return (
    <FooterContainer>
      <InnerContainer>
        <LogoWrapper>
          <LogoImage src={LogoImg} alt="NatrueGlow Logo" />
        </LogoWrapper>

        <TopSection>
          {/* (1) 고객센터 */}
          <Column>
            <Title>고객센터</Title>
            <CustomerList>
              <ListItem style={{ marginBottom: "5px" }}>
                <StrongTitle>{customerService.phone.title} </StrongTitle>
                {customerService.phone.label}
              </ListItem>
              {/* 수정된 info 배열 사용 */}
              {customerService.info.map((item, i) => (
                <InfoItem key={i}>
                  <span>{item.title}</span> {item.label}
                </InfoItem>
              ))}
              {customerService.emails.map((e) => (
                <EmailItem key={e.id}>
                  <span>{e.title}</span>
                  <a href={`mailto:${e.address}`}>{e.address}</a>
                </EmailItem>
              ))}
            </CustomerList>
            <ButtonGroup>
              {customerService.buttons.map((btn) => (
                <TempButton
                  key={btn.id}
                  href={btn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {btn.label}
                </TempButton>
              ))}
            </ButtonGroup>
          </Column>

          {/* (2) 고객지원 */}
          <Column>
            <Title>고객지원</Title>
            <List>
              {support.map((item, i) => (
                <ListItem key={i}>
                  <a href={item.url}>{item.title}</a>
                </ListItem>
              ))}
            </List>
          </Column>

          {/* (3) 회사 정보 */}
          <Column>
            <Title>회사 정보</Title>
            <List>
              {companyInfo.map((item, i) => (
                <InfoItem key={i}>
                  {/* 1. url이 있는 경우 (브랜드 소개, 채용정보, 입점문의 등) */}
                  {item.url ? (
                    <a
                      href={
                        item.url.includes("@") ? `mailto:${item.url}` : item.url
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{item.title}</span>
                    </a>
                  ) : (
                    /* 2. url이 없는 경우 (상호명, 대표자 등) */
                    <>
                      <span>{item.title}</span> {item.label}
                    </>
                  )}
                </InfoItem>
              ))}
            </List>
          </Column>

          {/* (4) 쇼핑 정보 */}
          <Column>
            <Title>쇼핑 정보</Title>
            <List>
              {shopping.map((item, i) => (
                <ListItem key={i}>
                  <a href={item.url}>{item.label}</a>
                </ListItem>
              ))}
            </List>
          </Column>
        </TopSection>

        <CircleButtonList>
          {sns.map((item) => (
            <CircleButton key={item.label} href={item.url} target="_blank">
              {SNS_ICONS[item.label]}
            </CircleButton>
          ))}
        </CircleButtonList>

        <Copyright>
          &copy; 2026 <span>NatureGlow.</span> All rights reserved.
        </Copyright>
      </InnerContainer>
    </FooterContainer>
  );
}
