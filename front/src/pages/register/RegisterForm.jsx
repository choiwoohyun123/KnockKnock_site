import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as Api from "../../api";

import {
  mbtiList,
  idealList,
  hobbyList,
  personalityList,
} from "../../constants/registerConstants";

import { useImageUpload } from "../../components/hooks/UseImageUpload";


import {
  validateEmail,
  validatePassword,
  validateName,
} from "../../util/common";

import TextareaAutosize from "react-textarea-autosize";

import Modal from "../../components/modal/Modal";
import Toggle from "../../components/modal/Toggle";
import styled, { css } from "styled-components";
import { DispatchContext } from "../../App";


function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);
  const today = new Date().toISOString().split("T")[0];
  // const [form, setForm] = React.useState({
  //   name: "",
  //   nickname: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // })
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [job, setJob] = useState("");
  const [region, setRegion] = useState("");

  const [imageUrl, handleImageUpload] = useImageUpload();
  const [mbti, setMbti] = useState("");
  const [religion, setReligion] = useState("");
  const [height, setHeight] = useState("");
  const [hobby, setHobby] = useState([]);
  const [personality, setPersonality] = useState([]);
  const [ideal, setIdeal] = useState([]);
  const [introduce, setIntroduce] = useState("");

  const [isHobbyModalOpen, setIsHobbyModalOpen] = useState(false);
  const [isMbtiModalOpen, setIsMbtiModalOpen] = useState(false);
  const [isPersonalityModalOpen, setIsPersonalityModalOpen] = useState(false);
  const [isIdealModalOpen, setIsIdealModalOpen] = useState(false);

  const GenderButton = ({ color, label, gender, setGender }) => {
    const isSelected = gender === label;

    return (
      <StyledGenderButton
        color={isSelected ? color : "white"}
        $selectedcolor={color}
        onClick={() => setGender(label)}
      >
        {label}
      </StyledGenderButton>
    );
  };

  const handleHobbyClick = (element) => {
    if (hobby.includes(element)) {
      setHobby(hobby.filter((e) => e !== element));
    } else {
      setHobby([...hobby, element]);
    }
  };

  const handleMbtiClick = (element) => {
    setMbti(element);
  };

  const handlePersonalityClick = (element) => {
    if (personality.includes(element)) {
      setPersonality(personality.filter((e) => e !== element));
    } else {
      setPersonality([...personality, element]);
    }
  };

  const handleIdealClick = (element) => {
    if (ideal.includes(element)) {
      setIdeal(ideal.filter((e) => e !== element));
    } else {
      setIdeal([...ideal, element]);
    }
  };

  const handleConfirmHobby = () => {
    setIsHobbyModalOpen(false);
  };

  const handleConfirmMbti = () => {
    setIsMbtiModalOpen(false);
  };

  const handleConfirmPersonality = () => {
    setIsPersonalityModalOpen(false);
  };

  const handleComfirmIdeal = () => {
    setIsIdealModalOpen(false);
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const isNameValid = validateName(name);
  const isPasswordSame = password === confirmPassword;
  const isNicknameValid = nickname.length >= 2;

  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNicknameValid;

  const handleSubmit = async (e) => {
    try {
      await Api.post("users/register", {
        username: name,
        email,
        nickname,
        user_password: password,
        gender,
        birthday: birthdate,
        job,
        region,
        mbti,
        religion,
        height,
        hobby,
        personality,
        introduce,
      });
      // 로그인 페이지로 이동함.
      const res = await Api.post("users/login", {
        email,
        password,
      });

      const user = res.data;
      const jwtToken = user.token;

      localStorage.setItem("userToken", jwtToken);
      localStorage.setItem("userId", user.userId);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      navigate("/", { replace: true });
    } catch (err) {
      if (err.response.data.message) {
        console.log(err.response.data.message);
      } else {
        console.log("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  return (
    <div>
      <Wrapper>
        <LabelInput>
          <StyledLabel>이름 *</StyledLabel>
          <StyledInput
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isValid={isNameValid}
            required
          />
        </LabelInput>

        <LabelInput>
          <StyledLabel>닉네임 *</StyledLabel>
          <StyledInput
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            isValid={isNicknameValid}
            required
          />
        </LabelInput>

        <LabelInput isValid={isEmailValid}>
          <StyledLabel>이메일 *</StyledLabel>
          <StyledInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isValid={isEmailValid}
            required
          />
        </LabelInput>

        <LabelInput>
          <StyledLabel>비밀번호 *</StyledLabel>
          <StyledInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isValid={isPasswordValid}
            required
          />
        </LabelInput>

        <LabelInput>
          <StyledLabel>비밀번호 확인</StyledLabel>
          <StyledInput
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            isValid={isPasswordSame && isPasswordValid}
            required
          />
        </LabelInput>

        <LabelInput>
          <StyledLabel>성별</StyledLabel>
          <GenderButton
            color="blue"
            label="남"
            gender={gender}
            setGender={setGender}
          />
          <GenderButton
            color="red"
            label="여"
            gender={gender}
            setGender={setGender}
          />
        </LabelInput>

        <LabelInput>
          <StyledLabel>생년월일</StyledLabel>
          <StyledInput
            type="date"
            value={birthdate}
            max={today}
            onChange={(e) => setBirthdate(e.target.value)}
            isValid={!!birthdate}
            required
          />
        </LabelInput>

        <LabelInput>
          <StyledLabel>직업</StyledLabel>
          <StyledInput
            type="text"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            isValid={!!job}
            required
          />
        </LabelInput>

        <LabelInput>
          <StyledLabel>지역</StyledLabel>
          <StyledInput
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            isValid={!!region}
            required
          />
        </LabelInput>
      </Wrapper>
      <Toggle>
        <Wrapper>
          <LabelInput>
            <StyledLabel>대표사진</StyledLabel>
            <StyledInput
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              isValid="true"
            />
          </LabelInput>

          <LabelInput>
            <StyledLabel>종교</StyledLabel>
            <StyledInput
              type="text"
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
              isValid="true"
            />
          </LabelInput>

          <LabelInput>
            <StyledLabel>키</StyledLabel>
            <StyledInput
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              isValid="true"
            />
          </LabelInput>

          <LabelInput style={{ justifyContent: "center" }}>
            <ModalButton
              style={{ marginRight: "10px" }}
              onClick={() => setIsHobbyModalOpen(true)}
            >
              취미 {hobby !== "" ? hobby : ""}
            </ModalButton>
            <ModalButton onClick={() => setIsMbtiModalOpen(true)}>
              MBTI {mbti !== "" ? mbti : ""}
            </ModalButton>
          </LabelInput>
          <LabelInput style={{ justifyContent: "center" }}>
            <ModalButton
              style={{ marginRight: "10px" }}
              onClick={() => setIsPersonalityModalOpen(true)}
            >
              내가 생각하는 나
            </ModalButton>
            <ModalButton onClick={() => setIsIdealModalOpen(true)}>
              내가 좋아하는 상대
            </ModalButton>
          </LabelInput>
          {isHobbyModalOpen && (
            <Modal onClose={() => setIsHobbyModalOpen(false)}>
              <h2>취미는?</h2>
              <p>2개 이상 선택하세요</p>
              <ModalListDiv>
                {hobbyList.map((element, index) => (
                  <StyledElementButton
                    key={index}
                    selected={hobby.includes(element)}
                    onClick={() => handleHobbyClick(element)}
                  >
                    {element}
                  </StyledElementButton>
                ))}
              </ModalListDiv>
              <div style={{display: "flex", justifyContent: "center", marginRight: "5px"}}>
                <ConfirmButton onClick={handleConfirmHobby}>확인</ConfirmButton>
                <ConfirmButton onClick={() => setIsHobbyModalOpen(false)}>닫기</ConfirmButton>
              </div>
            </Modal>
          )}

          {isMbtiModalOpen && (
            <Modal onClose={() => setIsMbtiModalOpen(false)}>
              <h2>MBTI는?</h2>
              <ModalMbtiListDiv>
                {mbtiList.map((element, index) => (
                  <StyledElementButton
                    key={index}
                    style={{
                      backgroundColor: mbti.includes(element)
                        ? "#61dafbaa"
                        : "white",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid black",
                      cursor: "pointer",
                    }}
                    onClick={() => handleMbtiClick(element)}
                  >
                    {element}
                  </StyledElementButton>
                ))}
              </ModalMbtiListDiv>
              <div style={{display: "flex", justifyContent: "center", marginRight: "5px"}}>
                <ConfirmButton onClick={handleConfirmMbti}>확인</ConfirmButton>
                <ConfirmButton onClick={() => setIsMbtiModalOpen(false)}>닫기</ConfirmButton>
              </div>
            </Modal>
          )}

          {isPersonalityModalOpen && (
            <Modal onClose={() => setIsPersonalityModalOpen(false)}>
              <h2>내가 생각하는 나는?</h2>
              <p>2개 이상 선택하세요</p>
              <ModalListDiv>
                {personalityList.map((element, index) => (
                  <StyledElementButton
                    key={index}
                    style={{
                      backgroundColor: personality.includes(element)
                        ? "#61dafbaa"
                        : "white",
                      padding: "10px",
                      margin: "5px",
                      borderRadius: "5px",
                      border: "1px solid black",
                      cursor: "pointer",
                    }}
                    onClick={() => handlePersonalityClick(element)}
                  >
                    {element}
                  </StyledElementButton>
                ))}
              </ModalListDiv>
              <div style={{display: "flex", justifyContent: "center", marginRight: "5px"}}>
                <ConfirmButton onClick={handleConfirmPersonality}>확인</ConfirmButton>
                <ConfirmButton onClick={() => setIsPersonalityModalOpen(false)}>닫기</ConfirmButton>
              </div>
              
            </Modal>
          )}

          {isIdealModalOpen && (
            <Modal onClose={() => setIsIdealModalOpen(false)}>
              <h2>내가 좋아하는 상대는?</h2>
              <p>2개 이상 선택하세요</p>
              <ModalListDiv>
                {idealList.map((element, index) => (
                  <StyledElementButton
                    key={index}
                    style={{
                      backgroundColor: ideal.includes(element)
                        ? "#61dafbaa"
                        : "white",
                      padding: "10px",
                      margin: "5px",
                      borderRadius: "5px",
                      border: "1px solid black",
                      cursor: "pointer",
                    }}
                    onClick={() => handleIdealClick(element)}
                  >
                    {element}
                  </StyledElementButton>
                ))}
              </ModalListDiv>
              <div style={{display: "flex", justifyContent: "center", marginRight: "5px"}}>
                <ConfirmButton onClick={handleComfirmIdeal}>확인</ConfirmButton>
                <ConfirmButton onClick={() => setIsIdealModalOpen(false)}>닫기</ConfirmButton>
              </div>
            </Modal>
          )}

          <StyledLabel>자기소개</StyledLabel>
          <StyledTextareaAutosize
            minRows={3}
            value={introduce}
            onChange={(e) => setIntroduce(e.target.value)}
          />
        </Wrapper>
      </Toggle>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex" }}>
          <StyledButton
            style={{ marginRight: "10px" }}
            onClick={() => navigate("/login")}
          >
            로그인
          </StyledButton>
          <StyledButton disabled={!isFormValid} onClick={handleSubmit}>
            회원가입
          </StyledButton>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;

const StyledInput = styled.input`
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;

  &:focus {
    outline: none; /* 포커스시 파란색 테두리 제거 */
  }

  ${({ isValid }) =>
    !isValid &&
    css`
      border: 2px solid red;
    `}
`;

const StyledLabel = styled.label`
  font-weight: bold;
  margin-right: 10px;
  width: 120px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #ccc;
      cursor: not-allowed;
    `}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid black;
  border-radius: 10px;
  width: 50vw;
  margin: 50px auto 0 auto;
`;

const LabelInput = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 80%;
`;

const StyledGenderButton = styled.button`
  padding: 10px;
  background-color: ${(props) => props.color};
  color: ${(props) => (props.color === "white" ? "black" : "white")};
  border: 2px solid ${(props) => props.selectedcolor};
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
`;

const StyledTextareaAutosize = styled(TextareaAutosize)`
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

const ModalButton = styled.button`
  width: 30%;
  padding: 10px 20px;
  background-color: #ffffff;
  color: black;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const ModalListDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ModalMbtiListDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StyledElementButton = styled.button`
  background-color: ${({ selected }) => (selected ? "#61dafbaa" : "white")};
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid black;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${({ selected }) => (selected ? "#61dafbaa" : "#f0f0f0")};
  }
`;

const ConfirmButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: #61dafb;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #4ecdc4;
  }
`;