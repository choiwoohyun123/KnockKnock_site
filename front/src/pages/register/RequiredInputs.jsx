import React, { useState } from "react";
import * as S from "./style";
import styled from "styled-components";
import ValidationFields from "./ValidationFields";
import { currentDate } from "../../util/currentDateTime";
import { regions } from "../../constants/registerConstants";
const RequiredInputs = () => {
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    birthdate: "",
    gender: "",
    job: "",
    region: "",
  });
  const { name, nickname, birthdate, gender, job, region } = formData;

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    const newValue = name === "birthdate" ? formatDate(value) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };
  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };

  RequiredInputs.getFormData = () => {
    return formData;
  };

  return (
    <>
      <S.InputBox>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          placeholder="이름"
          onChange={onChange}
        />
        <label htmlFor="name">이름</label>
      </S.InputBox>

      <S.InputBox>
        <input
          id="nickname"
          type="text"
          name="nickname"
          value={nickname}
          placeholder="닉네임"
          onChange={onChange}
        />
        <label htmlFor="nickname">닉네임</label>
      </S.InputBox>

      <ValidationFields
        formData={formData}
        setFormData={setFormData}
        onChange={onChange}
      />
      <S.RightAlignedBox style={{ marginTop: "20px", border: "none" }}>
        <S.InputBox style={{ width: "100%" }}>
          <S.Select
            name="gender"
            value={gender}
            onChange={onChange}
            style={{ flex: 1 }}
          >
            <option>성별</option>
            <option value="남">남자</option>
            <option value="여">여자</option>
          </S.Select>
        </S.InputBox>
        <S.InputBox style={{ width: "100%" }}>
          <S.Select
            name="region"
            value={region}
            onChange={onChange}
            style={{ flex: 1 }}
          >
            <option>지역</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </S.Select>
        </S.InputBox>
      </S.RightAlignedBox>

      <S.InputBox>
        <input
          id="birthdate"
          type="date"
          name="birthdate"
          value={birthdate}
          onChange={onChange}
          max={currentDate}
        />
        <label htmlFor="birthdate" style={{ marginTop: "5px" }}>
          생년월일
        </label>
      </S.InputBox>

      <S.InputBox>
        <input
          id="job"
          type="text"
          name="job"
          value={job}
          placeholder="직업"
          onChange={onChange}
        />
        <label htmlFor="job">직업</label>
      </S.InputBox>
    </>
  );
};

export default RequiredInputs;

const StyledLabel = styled.label`
  display: flex;
  font-weight: bold;
  margin-right: 10px;
  width: 15%;
`;
const StyledInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: solid 1px #ccc;
  padding: 20px 0px 5px 0px;
  font-size: 14pt;
  width: 50%;

  &:placeholder-shown + ${StyledLabel} {
    color: #aaa;
    font-size: 14pt;
    top: 15px;
  }

  &:focus + ${StyledLabel} {
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

  &:not(:placeholder-shown) + ${StyledLabel} {
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
`;
