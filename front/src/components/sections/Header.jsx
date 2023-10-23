import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  DispatchContext,
  UserStateContext,
} from "../../context/user/UserProvider";
import { ROUTE } from "../../routes/routes";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import useIsMobile from "../hooks/useIsMobile";
import { showSuccess } from "../../assets/alert";
import { useToggle } from "../hooks/useToggle";
const Header = () => {
  const isMobile = useIsMobile();
  const { user } = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);
  const { opened, onOpen, onClose } = useToggle();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("userToken");
    dispatch({ type: "LOGOUT" });
    showSuccess("로그아웃되었습니다.");
    navigate("/");
  };

  return (
    <HeaderWrap>
      <HeaderContainer>
        <LogoBox>
          <Link to={ROUTE.MAIN.link} onClick={onClose}>
            <LogoImgBox>
              <img src="/002.png" />
            </LogoImgBox>
          </Link>
        </LogoBox>
        <NavigationBox>
          {!isMobile && (
            <DesktopMenu
              isLogin={user ? true : false}
              user={user}
              logout={logout}
              opened={opened}
              onOpen={onOpen}
              onClose={onClose}
            />
          )}

          {isMobile && (
            <MobileMenu
              isLogin={user ? true : false}
              user={user}
              logout={logout}
              opened={opened}
              onOpen={onOpen}
              onClose={onClose}
            />
          )}
        </NavigationBox>
      </HeaderContainer>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  max-width: 1024px;
  width: 100%;
  height: 4rem;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 998;
  transform: translate(-50%, 0);
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const LogoImgBox = styled.div`
  width: 30px;
  height: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  img {
    width: 4rem;
    height: auto;
  }
`;

const NavigationBox = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export default Header;
