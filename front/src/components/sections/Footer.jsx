import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserStateContext } from "../../context/user/UserProvider";
import styled from "styled-components";
import { MOBILE_BREAK_POINT } from "../layout/breakpoint";

const FooterWrapper = styled.footer`
  background-color: #fff;
  color: #000; // 글자색을 검은색으로 변경
  font-size: 0.8em;
  bottom: 0;
  left: 0;
  width: 100%;
  max-width: 1024px;
  height: 8rem;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid black;
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    /* 화면 너비가 768px 이하일 때 footer 안보임 */
    display: none;
  }
`;

const LogoImage = styled.img`
  width: 15%;
  height: auto;
  margin-left: 40px;
`;

const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 210px;
  text-align: left;
  margin: 10px;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
  text-align: left;
  margin: 10px;
`;

const FrontMember = styled.div`
  padding-left: 1rem;
  margin-top: 5px;
  white-space: nowrap; // 텍스트를 한 줄에 표시
  overflow: hidden; // 텍스트가 너비를 초과하면 잘림
  text-overflow: ellipsis; // 텍스트가 너비를 초과하면 ... 으로 표시
  max-width: 100%; // 컨테이너의 최대 너비를 지정
`;

const BackMember = styled.div`
  padding-left: 2rem;
  margin-top: 5px;
`;

const FooterText = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  text-align: center;
  color: #000;
  font-size: 0.8rem;
  margin: 0; // 기존 마진 제거
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  color: #000; // 원하는 색상
  text-decoration: none;
  margin: 0.2rem;
  font-weight: 600;
  &:hover {
    text-decoration: underline; // 마우스를 올렸을 때 밑줄 추가
  }
`;

const Footer = () => {
  const { user } = useContext(UserStateContext);

  return (
    <FooterWrapper>
      <LogoImage src={"/006.png"} alt="Logo" />
      <MemberContainer>
        <FooterText>Front</FooterText>
        <FrontMember>정원석 github @jeong1suk</FrontMember>
        <FrontMember>최우현 github @choiwoohyun123</FrontMember>
        <FrontMember>정유진 github @nanyoojinee</FrontMember>
      </MemberContainer>
      <MemberContainer>
        <FooterText>Back</FooterText>
        <BackMember>허창원 github @wonn23</BackMember>
        <BackMember>정재훈 github @J-A-Y2</BackMember>
        <BackMember>이은석 github @enxxi</BackMember>
      </MemberContainer>
      <LinkContainer>
        <FooterText>KnockKnock</FooterText>
        <StyledLink to="/ai">뷰티톡톡</StyledLink>
        {user && (
          <>
            <StyledLink to="/todayknock">오늘의 낙낙</StyledLink>
            <StyledLink to="/play">히히낙낙</StyledLink>
          </>
        )}
      </LinkContainer>
    </FooterWrapper>
  );
};

export default Footer;
