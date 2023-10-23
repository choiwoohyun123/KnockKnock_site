import React, { useState } from "react";
import * as S from "./style";
import { validateEmail, validatePassword } from "../../util/common";
import { BiHide, BiShow } from "react-icons/bi";

const ValidationFields = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPwd: "",
  });
  const { email, password, confirmPwd, birthdate } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const isPasswordSame = password === confirmPwd;
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  ValidationFields.getFormData = () => {
    return formData;
  };
  // console.log("유효성");
  return (
    <>
      <S.InputBox>
        <input
          id="email"
          type="text"
          name="email"
          value={email}
          placeholder="이메일"
          onChange={onChange}
        />
        <label htmlFor="email">이메일</label>
      </S.InputBox>
      {!isEmailValid && email.length > 0 && (
        <S.ErrorBox>올바른 이메일을 입력해주세요.</S.ErrorBox>
      )}
      <S.RightAlignedBox>
        <S.InputBox
          style={{ width: "90%", display: "flex", alignItems: "center" }}
        >
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            placeholder="비밀번호"
            onChange={onChange}
          />
          <label htmlFor="email">비밀번호</label>
          {showPassword ? (
            <BiHide className="pswdIcon" onClick={togglePasswordVisibility} />
          ) : (
            <BiShow className="pswdIcon" onClick={togglePasswordVisibility} />
          )}
        </S.InputBox>
      </S.RightAlignedBox>
      {!isPasswordValid && password.length > 0 && (
        <S.ErrorBox>숫자, 문자, 특수문자 포함 8글자 이상</S.ErrorBox>
      )}

      <S.InputBox
        style={{ width: "90%", display: "flex", alignItems: "center" }}
      >
        <input
          id="confirmpwd"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPwd"
          value={confirmPwd}
          placeholder="비밀번호 확인"
          onChange={onChange}
        />
        <label htmlFor="confirmpwd">비밀번호 확인</label>
        {showConfirmPassword ? (
          <BiHide
            className="pswdIcon"
            onClick={toggleConfirmPasswordVisibility}
          />
        ) : (
          <BiShow
            className="pswdIcon"
            onClick={toggleConfirmPasswordVisibility}
          />
        )}
      </S.InputBox>
      {!isPasswordSame && isPasswordValid && (
        <S.ErrorBox>비밀번호가 다릅니다.</S.ErrorBox>
      )}
    </>
  );
};

export default ValidationFields;
