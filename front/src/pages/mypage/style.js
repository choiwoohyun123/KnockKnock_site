import styled from "styled-components";
import { MOBILE_BREAK_POINT } from "../../components/layout/breakpoint";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
export const Header = styled.header`
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  border: 2px solid #000;
  border-radius: 5px;
  padding: 10px;
`;

export const JoinButton = styled.button`
  width: 40%;
  padding: 21px 0 17px;
  border: 0;
  cursor: pointer;
  color: #fff;
  background-color: #d4baeb;
  font-size: 20px;
  font-weight: 400;
  margin-top: 30px;
  margin-left: 30px;

  /* background-image: linear-gradient(to top, #cd9cf2 0%, #f6f3ff 100%); */
  &:hover {
    background: linear-gradient(to top, #cd9cf2 0%, #f6f3ff 100%);
    background-color: #80b5ea;
  }

  &:active {
    position: relative;
    top: 1px;
  }
`;
export const Heading = styled.h3`
  margin: 10px auto;
  font-size: 1rem;
  font-weight: 700;
  font-family: KIMM_Bold;
  width: 30%;
  text-align: center;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    font-size: 0.8rem;
    font-weight: 1000;
  }
`;

export const Box = styled.span`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40%;
  border: solid 1px #dadada;
  border-radius: 20px;
  padding: 10px 14px 10px 14px;
  box-sizing: border-box;
  background: #fff;
  position: relative;
  margin: 10px auto;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 80%;
    height: 10%;
  }
`;
export const InputBox = styled.div`
  position: relative;
  margin: 10px 10px;
  height: 60px;
  width: 100%;

  input {
    background: transparent;
    border: none;
    border-bottom: solid 1px #ccc;
    /* margin-bottom: 5px; */
    padding: 20px 0px 5px 0px;
    font-size: 14pt;
    width: 50%;
    transition: border-bottom 0.2s ease, outline 0.2s ease;

    &:placeholder-shown + label {
      color: #aaa;
      font-size: 14pt;
      top: 15px;
    }

    &:focus + label {
      color: #8aa1a1;
      font-size: 10pt;
      pointer-events: none;
      position: absolute;
      left: 0px;
      top: 0px;
      transition: all 0.2s ease;
      -webkit-transition: all 0.2s ease;
      -moz-transition: all 0.2s ease;
      -o-transition: all 0.2s ease;
      transform: translateY(-100%);
      opacity: 1;
    }

    &:not(:placeholder-shown) + label {
      color: #8aa1a1;
      font-size: 10pt;
      pointer-events: none;
      position: absolute;
      left: 0px;
      top: 0px;
      transition: all 0.2s ease;
      -webkit-transition: all 0.2s ease;
      -moz-transition: all 0.2s ease;
      -o-transition: all 0.2s ease;
      transform: translateY(-100%);
      opacity: 1;
    }

    &:focus,
    &:not(:placeholder-shown) {
      border-bottom: solid 1px #8aa1a1;
      outline: none;
    }
  }

  label {
    opacity: 0;
    pointer-events: none;
    position: absolute;
    left: 0px;
    top: 15px;
    transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
  }
  .pswdIcon {
    /* your password icon styles */
    cursor: pointer;
    margin-left: 10px;
    /* right: 0; */
  }
`;
export const Select = styled.select`
  width: 100%;
  height: 29px;
  text-align: center;
  border: 1px solid #8aa1a1;
  border-radius: 20px;
  background: #fff;
  font-size: 15px;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    height: 70%;
    font-size: 0.5rem;
  }
`;
export const ImageUploadInput = styled.input`
  display: none;
`;
export const UploadedImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    /* 태블릿 화면에서 이미지 컨테이너의 너비를 50%로 */
    width: 50%;
    left: 50%;
    transform: translateX(50%);
  }
`;

export const UploadedImage = styled.img`
  width: 100%;
  max-height: 300px;
  margin-top: 10px;
`;
export const ToggleButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* padding-bottom: 5px; */
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    height: 10%;
    margin: 0;
  }
`;
export const Input = styled.input`
  display: block;
  position: relative;
  width: 70%;
  height: 20px;
  border: none;
  background: #fff;
  font-size: 1rem;
  /* @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 50%;
  } */
`;
export const ErrorBox = styled.span`
  /* margin-top: 9px; */
  font-size: 12px;
  color: red;
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    font-size: 0.2rem;
  }
`;

export const RightAlignedBox = styled(Box)`
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const Modal = styled.div`
  position: absolute;
  width: 50%;
  top: 30%;
  left: 50%;
  overflow-y: auto; /* Enable vertical scroll */
  max-height: 80%;
  transform: translate(-50%, -50%);
  background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-top: 14%;
  /* z-index: 10; */

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 80%;
    height: 50%;
  }
`;
export const ButtonSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 5px;
  /* align-items: center; */
  justify-content: center;
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    /* display:  */
    height: 10%;
    align-items: center;
  }
`;
export const Button = styled.button`
  font-size: 100%;
  font-family: "KIMM_Bold";
  /* padding: 10px 10px; */
  background-color: #f7cbd0;
  color: black;
  border: 10px double #fff;
  border-radius: 50px;
  cursor: pointer;
  /* margin: 50px 0 30px 0; */
  width: 40%;
  height: 50px;
  transition: 0.3s;

  &:hover {
    border: 10px double #3b0b0b;
    color: #3b0b0b;
    transform: scale(1.02);
  }

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    /* width: 50%; */
    font-size: 0.5rem;
    /* overflow-x: auto; */
  }
`;
export const ToggleButton = styled.a`
  box-shadow: inset 0px 1px 0px 0px #dcecfb;
  background: linear-gradient(to bottom, #bddbfa 5%, #80b5ea 100%);
  background-color: #bddbfa;
  border-radius: 6px;
  border: 1px solid #84f3;
  margin-top: 1rem;
  margin-left: 6rem;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #528ecc;

  &:hover {
    background: linear-gradient(to bottom, #80b5ea 5%, #bddbfa 100%);
    background-color: #80b5ea;
  }

  &:active {
    position: relative;
    top: 1px;
  }
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    margin-left: 0.9rem;
    margin-right: 1rem;
  }
`;
export const HobbyBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* margin: 0.1rem; */
`;
