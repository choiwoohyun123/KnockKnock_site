import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE } from "../../routes/routes";
import { getImageSrc } from "../../util/imageCheck";
const DesktopMenu = ({ isLogin, user, logout, opened, onOpen, onClose }) => {
  return (
    <DesktopMenuContainer>
      <DesktopNavMenu>
        <NavMenu>
          <MenuList>
            <Link to={ROUTE.AI.link} onClick={onClose}>
              뷰티톡톡
            </Link>
          </MenuList>

          {isLogin ? (
            <>
              <MenuList>
                <Link to={ROUTE.TodayKnock.link} onClick={onClose}>
                  오늘의 낙낙
                </Link>
              </MenuList>
              <MenuList>
                <Link to={ROUTE.Play.link} onClick={onClose}>
                  히히낙낙
                </Link>
              </MenuList>
              <ProfileContainer>
                <ProfilePicture
                  src={getImageSrc(user.profileImage)}
                  className={opened ? "open" : "false"}
                  onClick={onOpen}
                />
                {opened ? (
                  <DropdownMenu>
                    <MenuItem to={ROUTE.Mypage.link} onClick={onClose}>
                      마이페이지
                    </MenuItem>
                    <MenuItem to={ROUTE.MAIN.link} onClick={logout}>
                      로그아웃
                    </MenuItem>
                  </DropdownMenu>
                ) : null}
              </ProfileContainer>
            </>
          ) : (
            <>
              <MenuList>
                <Link to={ROUTE.LOGIN.link}>로그인</Link>
              </MenuList>
              <MenuList>
                <Link to={ROUTE.REGISTER.link}>회원가입</Link>
              </MenuList>
            </>
          )}
        </NavMenu>
      </DesktopNavMenu>
    </DesktopMenuContainer>
  );
};
const ProfileContainer = styled.div`
  position: relative;
  /* display: inline-block; Ensure the container takes the size of its content */
`;
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
  cursor: pointer;
`;
const DropdownMenu = styled.div`
  position: absolute;
  top: 3.5em;
  right: 0.2rem;
  margin-left: 2rem;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  z-index: 1;
`;
const DesktopMenuContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;
const DesktopNavMenu = styled.ul`
  display: flex;
`;
const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
`;
const MenuList = styled.li`
  padding: 0 1rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-family: "KIMM_Bold";
  font-weight: bold;
  letter-spacing: -0.5px;
  color: #252525;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    color: #f1b24a;
  }
  a {
    font-size: 0.7rem;
    font-weight: 500;
    color: #111;
    text-decoration: none;
    margin-left: 4rem;
    &:hover {
      color: #f1b24a;
    }
  }
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
export default DesktopMenu;
