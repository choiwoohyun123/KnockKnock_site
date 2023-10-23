import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./style";
import * as Api from "../../api";
import { DispatchContext } from "../../context/user/UserProvider";
import { validateEmail, validatePassword } from "../../util/common";
import { login } from "../../api/login";
import { showAlert } from "../../assets/alert";
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const isFormValid = isEmailValid && isPasswordValid;

  // 로그인 조건 충족시 버튼 색 변함
  const getButtonColor = () => {
    if (!isFormValid) {
      return "gray";
    }
    return "#B1B2FF";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await login({ email, password });
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      localStorage.setItem("userToken", jwtToken);
      localStorage.setItem("userId", user.userId);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      // 기본 페이지로 이동함.
      navigate("/", { replace: true });
      window.location.reload();
    } catch (err) {
      // console.log("로그인에 실패하였습니다.\n", err);
      // alert("로그인에 실패하였습니다.");
      showAlert(err.response.data.message);
    }
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <S.GradientBackground>
      <S.Container>
        <S.Header>Login</S.Header>
        <S.Form onSubmit={handleSubmit}>
          <S.InputBox>
            <input
              id="email"
              type="text"
              name="username"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              style={{
                borderBottomColor: email
                  ? isEmailValid
                    ? "#ccc"
                    : "red"
                  : "#ccc",
              }}
            />
            <label htmlFor="email">이메일</label>
            {!isEmailValid && email.length > 0 && (
              <S.WarningMessage>
                유효한 이메일 형식이 아닙니다.
              </S.WarningMessage>
            )}
          </S.InputBox>
          <br />
          <S.InputBox>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                borderBottomColor: password
                  ? isPasswordValid
                    ? "#ccc"
                    : "red"
                  : "#ccc",
              }}
            />
            <label htmlFor="password">비밀번호</label>
            {!isPasswordValid && password.length > 0 && (
              <S.WarningMessage>
                비밀번호는 문자, 숫자, 특수문자를 포함한 8글자 이상이어야
                합니다.
              </S.WarningMessage>
            )}
          </S.InputBox>
          <br />
          <S.Forgot to="/register">아이디가 없으신가요?</S.Forgot>
          <S.SubmitButton
            type="submit"
            value="로그인"
            disabled={!isFormValid}
            style={{ backgroundColor: getButtonColor() }} // 로그인 조건 충족시 로그인 버튼 색 변함
          />
        </S.Form>
      </S.Container>
    </S.GradientBackground>
  );
};

export default LoginForm;
