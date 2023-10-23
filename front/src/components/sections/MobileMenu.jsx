import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { ROUTE } from "../../routes/routes";
import { getImageSrc } from "../../util/imageCheck";
const MobileMenu = ({ isLogin, user, logout, opened, onOpen, onClose }) => {
  return (
    <>
      <HamburgerButton onClick={onOpen}>
        {isLogin ? (
          <ProfilePicture
            src={getImageSrc(user.profileImage)}
            className={opened ? "open" : "false"}
          />
        ) : (
          <HamburgerIcon className={opened ? "open" : "false"} />
        )}
      </HamburgerButton>

      {opened ? (
        <DropdownMenu>
          <MenuItem to={ROUTE.AI.link} onClick={onClose}>
            뷰티톡톡
          </MenuItem>{" "}
          {isLogin ? (
            <>
              <MenuItem to={ROUTE.TodayKnock.link} onClick={onClose}>
                오늘의 낙낙
              </MenuItem>
              <MenuItem to={ROUTE.Play.link} onClick={onClose}>
                히히낙낙
              </MenuItem>
              <MenuItem to={ROUTE.Mypage.link} onClick={onClose}>
                마이페이지
              </MenuItem>
              <MenuItem to={ROUTE.MAIN.link} onClick={logout}>
                로그아웃
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem to={ROUTE.LOGIN.link} onClick={onClose}>
                로그인
              </MenuItem>
              <MenuItem to={ROUTE.REGISTER.link} onClick={onClose}>
                회원가입
              </MenuItem>
            </>
          )}
        </DropdownMenu>
      ) : null}
    </>
  );
};
const ProfilePicture = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-color: #f2f2f2e2;
  border-width: 4px;
  border-style: solid;
  border-radius: 100%;
  margin-top: 0.2rem;
  /* margin-right: 50rem; */
  margin-left: 9rem;
  z-index: 1;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;
const HamburgerIcon = styled.div`
  width: 24px;
  height: 3px;
  background-color: #111;
  position: relative;
  transition: transform 0.3s ease;
  /* margin-top: 0.2rem; */
  margin-left: 0.5rem;
  z-index: 1;
  right: 1;
  &::before,
  &::after {
    content: "";
    position: absolute;
    right: 0.1rem;
    width: 100%;
    height: 3px;
    background-color: #111;
    transition: transform 0.3s ease;
  }

  &::before {
    top: -8px;
  }

  &::after {
    bottom: -8px;
  }

  &.open {
    transform: rotate(45deg);

    &::before {
      transform: rotate(90deg);
      top: 0;
    }

    &::after {
      transform: rotate(90deg);
      bottom: 0;
    }
  }
`;
const HamburgerButton = styled.button`
  flex: 0 0 auto;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 0.5rem;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 3.5rem;
  /* right: 0.5; */
  margin-left: 2rem;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  z-index: 1;
`;

const MenuItem = styled(Link)`
  display: block;
  color: #333;
  text-decoration: none;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: #e5e5e5;
  }
`;

export default MobileMenu;
