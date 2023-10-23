import styled from "styled-components";
import { MOBILE_BREAK_POINT } from "../../components/layout/breakpoint";

export const Content = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 460px;
  padding: 100px;
  margin-top: -2rem;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 70%;
  }
`;
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
export const Header = styled.header`
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-family: "KIMM_Bold";
  font-weight: bold;
  border: 2px solid #000;
  border-radius: 5px;
  padding: 10px;
`;

export const JoinButton = styled.button`
  font-size: 100%;
  font-family: "KIMM_Bold";
  /* padding: 10px 10px; */
  background-color: #f7cbd0;
  color: black;
  border: 10px double #fff;
  border-radius: 50px;
  cursor: pointer;
  /* margin: 50px 0 30px 0; */
  width: 50%;
  height: 50px;
  transition: 0.3s;

  &:hover {
    border: 10px double #3b0b0b;
    color: #3b0b0b;
    transform: scale(1.02);
  }

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    /* margin: 20px 0; */
    width: 50%;
    height: 60px;
    /* font-size: 7%; */
  }
`;
export const Heading = styled.h3`
  margin: 19px 0 8px;
  font-size: 14px;
  font-weight: 700;
`;

export const Box = styled.span`
  display: flex;
  align-items: center;
  width: 100%;
  height: 51px;
  border: solid 1px #dadada;
  border-radius: 20px;
  padding: 10px 14px 10px 14px;
  box-sizing: border-box;
  background: #fff;
  position: relative;
  margin: 15px auto;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    height: 10%;
    overflow-x: auto;
  }
`;
// export const Input = styled.input`
//   display: block;
//   position: relative;
//   width: 100%;
//   height: 29px;
//   border: none;
//   background: #fff;
//   font-size: 15px;
// `;
export const FileInput = styled.input`
  display: block;
  position: relative;
  width: 100%;
  height: 29px;
  border: none;
  background: #fff;
  font-size: 15px;
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
    width: 100%;
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
export const ErrorBox = styled.span`
  /* margin-top: 4px; */
  font-size: 12px;
  color: red;
`;
export const Select = styled.select`
  width: 100%;
  height: 29px;
  text-align: center;
  border: 1px solid #8aa1a1;
  border-radius: 20px;
  background: #fff;
  font-size: 15px;
`;
export const RightAlignedBox = styled.div`
  /* display: flex; */

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const UploadedImageContainer = styled.div`
  border: 2px dashed #ccc;
  border-radius: 20px;
  padding: 20px;
  margin: 20px auto;
  width: 80%;
`;
export const UploadedImage = styled.img`
  width: 100%;
  max-height: 300px;
  margin: 10px auto;
`;
export const Modal = styled.div`
  position: absolute;
  width: 80%;
  left: 50%;
  transform: translateX(-50%);
  background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 10;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    /* top: 70%; */
    width: 40%;
    max-height: 30%;
    overflow-x: auto;
  }
`;
export const Button = styled.div`
  font-size: 100%;
  font-family: "KIMM_Bold";
  /* padding: 10px 10px; */
  background-color: #f7cbd0;
  color: black;
  border: 10px double #fff;
  border-radius: 50px;
  cursor: pointer;
  /* margin: 50px 0 30px 0; */
  width: 30%;
  /* height: 20%; */
  transition: 0.3s;

  &:hover {
    border: 10px double #3b0b0b;
    color: #3b0b0b;
    transform: scale(1.02);
  }

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    /* width: 50%; */
    height: 50%;
    font-size: 0.5rem;
    overflow-x: auto;
  }
  p {
    @media (max-width: ${MOBILE_BREAK_POINT}) {
      font-size: 0.2rem;
    }
  }
`;
export const ImageUploadInput = styled.input`
  display: none;
`;

export const ToggleButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* padding-bottom: 5px; */
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    height: 10%;
  }
`;
export const ToggleButton = styled.a`
  box-shadow: inset 0px 1px 0px 0px #dcecfb;
  background: linear-gradient(to bottom, #bddbfa 5%, #80b5ea 100%);
  background-color: #bddbfa;
  border-radius: 6px;
  border: 1px solid #84bbf3;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #528ecc;
  width: 100px; // Set the desired width
  height: 20px; // Set the desired height
  &:hover {
    background: linear-gradient(to bottom, #80b5ea 5%, #bddbfa 100%);
    background-color: #80b5ea;
  }

  &:active {
    position: relative;
    top: 1px;
  }
`;
export const HobbyBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border: none;
  /* margin: 0.1rem; */
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin-bottom: 10px;
`;
