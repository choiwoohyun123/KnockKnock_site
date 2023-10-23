import styled from "styled-components";
import { Link } from "react-router-dom";
import { MOBILE_BREAK_POINT } from "../../components/layout/breakpoint.js";
export const GradientBackground = styled.div`
  /* Gradient background with two colors: #e6e9f0 and #eef1f5 */
  display: flex;
  justify-content: center;
  margin: 70px;
  padding: 60px;
  height: 100%;
  /* min-height: 700px; */
  /* Gradient background with two colors: red and blue */
  background-image: linear-gradient(
    45deg,
    #ff9a9e 0%,
    #fad0c4 99%,
    #fad0c4 100%
  );
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    /* viewport 너비가 767px 이하일 경우 */
    padding: 0;
    margin: 70px auto; /* 컨테이너를 가로 중앙 정렬 */
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
  width: 70%;
  margin-top: 20px;
  max-width: 500px;
  min-height: 600px;
  background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    /* viewport 너비가 767px 이하일 경우 */
    max-width: 450px;
    width: 90%;
    margin: 60px auto; /* 컨테이너를 가로 중앙 정렬 */
  }

  /* background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%); */
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-family: "KIMM_Bold";
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
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
    padding: 20px 0px 5px 0px;
    font-size: 14pt;
    width: 100%;

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
`;

export const SubmitButton = styled.input`
  background-color: #8aa1a1;
  border: none;
  color: white;
  border-radius: 5px;
  width: 100%;
  height: 35px;
  font-size: 14pt;
  font-family: "KIMM_Bold";
  margin-top: 20px;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 70%;
  }
`; // 로그인 버튼 활성화 시 커서 모양 변하는 것 추가

export const Forgot = styled(Link)`
  width: 100%;
  text-align: right;
  font-size: 12pt;
  font-family: "KIMM_Bold";
  color: #179972;
  margin: 10px 20px;
`;

export const WarningMessage = styled.p`
  color: red;
  font-size: 0.7rem;
  margin: 0;
  padding: 0;
`;
