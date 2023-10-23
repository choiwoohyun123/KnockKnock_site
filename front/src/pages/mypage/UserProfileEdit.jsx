import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useToggle } from "../../components/hooks/useToggle";
import * as S from "./style";
import { mbtiList } from "../../constants/registerConstants";
import { ModalHobby } from "../register/ModalHobby";
import { ModalPersonality } from "../register/ModalPersonality";
import { ModalIdeal } from "../register/ModalIdeal";
import * as Api from "../../api";
import { showAlert, showSuccess } from "../../assets/alert";
import { DispatchContext } from "../../context/user/UserProvider";
import { regions } from "../../constants/registerConstants";
import { MOBILE_BREAK_POINT } from "../../components/layout/breakpoint";
const UserProfileEdit = ({ user }) => {
  const dispatch = useContext(DispatchContext);
  const { opened, onOpen, onClose } = useToggle();
  const [previewURL, setPreviewURL] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  const [formData, setFormData] = useState({
    name: user.name || "",
    nickname: user?.nickname || "",
    password: user.password,
    gender: user?.gender || "",
    birthdate: user.birthdate,
    job: user?.job || "",
    region: user?.region || "",
    height: user?.height || "",
    mbti: user?.mbti || "",
    hobby: user?.hobby || [],
    personality: user?.personality || [],
    ideal: user?.ideal || [],
    introduce: user?.introduce || "",
  });
  const {
    name,
    nickname,
    password,
    gender,
    birthdate,
    job,
    region,
    height,
    mbti,
    hobby,
    personality,
    ideal,
    introduce,
  } = formData;
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      hobby: user.hobby || [],
      personality: user.personality || [],
      ideal: user.ideal || [],
    }));
  }, [user]); //이거 정보가 늦게 받아와짐.
  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onArrayChange = (array, element, arrayPropertyName, maxLimit) => {
    setFormData((prev) => {
      const newArray = array.includes(element)
        ? array.filter((e) => e !== element)
        : [...array, element];

      if (newArray.length > maxLimit) {
        newArray.splice(maxLimit);
      }
      return {
        ...prev,
        [arrayPropertyName]: newArray,
      };
    });
  };

  const handleHobbyClick = (element) => {
    onArrayChange(hobby, element, "hobby", 5);
  };

  const handlePersonalityClick = (element) => {
    onArrayChange(personality, element, "personality", 5);
  };

  const handleIdealClick = (element) => {
    onArrayChange(ideal, element, "ideal", 5);
  };
  const updatedHobby =
    formData.hobby && formData.hobby.length >= 0
      ? formData.hobby
      : user.hobby !== undefined
      ? user.hobby
      : [];
  const updatedPersonality =
    formData.personality && formData.personality.length >= 0
      ? formData.personality
      : user.personality !== undefined
      ? user.personality
      : [];
  const updatedIdeal =
    formData.ideal && formData.ideal.length >= 0
      ? formData.ideal
      : user.ideal !== undefined
      ? user.ideal
      : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (selectedFile) {
        const formImgData = new FormData();
        formImgData.append("image", selectedFile);
        const res = await Api.post("files", formImgData);
        response = res.data;
        console.log(response);
      } else {
        response = user.profileImage;
      }
      const requestData = await Api.put("users/mypage", {
        nickname: formData.nickname === "" ? user.nickname : formData.nickname,
        job: formData.job === "" ? user.job : formData.job,
        region: formData.region === "" ? user.region : formData.region,
        mbti: formData.mbti === "" ? user.mbti : formData.mbti,
        height: formData.height === "" ? user.height : formData.height,
        hobby: updatedHobby,
        personality: updatedPersonality,
        ideal: updatedIdeal,
        introduce:
          formData.introduce === "" ? user.introduce : formData.introduce,
        profileImage: ["profile", response],
        backgroundImage: ["background", ""],
      });
      if (requestData.status === 200) {
        showSuccess("변경된 정보가 저장되었습니다.", "/mypage");
        // onClose();
      } else {
        showAlert("정보 변경에 실패했습니다.");
      }
    } catch (err) {
      showAlert(err.response.data.message);
      console.log(err);
    }
  };

  useEffect(() => {
    if (opened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [opened]);

  return (
    <>
      <S.Button style={{ textAlign: "center" }} onClick={() => onOpen()}>
        <span style={{ fontFamily: "KIMM_Bold" }}>정보 수정하기</span>
      </S.Button>
      {opened && (
        <ModalOverlay>
          <S.Modal>
            <h2 style={{ textAlign: "center", fontFamily: "KIMM_Bold" }}>
              정보 수정하기
            </h2>
            <CloseButton onClick={onClose}>X</CloseButton>
            <S.Box>
              <S.Heading>닉네임</S.Heading>
              <S.Input
                name="nickname"
                value={nickname}
                placeholder={user.nickname}
                onChange={onChange}
              ></S.Input>
            </S.Box>

            <S.Box>
              <S.Heading>직업</S.Heading>
              <S.Input
                name="job"
                value={job}
                placeholder={user.job}
                onChange={onChange}
              ></S.Input>
            </S.Box>
            <S.Box>
              <S.Select
                name="region"
                value={region}
                onChange={onChange}
                style={{ border: "none" }}
              >
                <option>{user.region}</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </S.Select>
            </S.Box>
            <S.ToggleButtonWrapper>
              <S.Button style={{ cursor: "auto" }}>
                <S.ImageUploadInput
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                  사진 선택
                </label>
              </S.Button>
            </S.ToggleButtonWrapper>
            {/* <S.Box>
              <S.Input type="file" onChange={handleFileChange} />
            </S.Box> */}
            {selectedFile && (
              <S.UploadedImageContainer>
                <S.UploadedImage
                  src={previewURL}
                  alt="Selected Image"
                  style={{ width: "50%" }}
                />
              </S.UploadedImageContainer>
            )}
            <S.Box>
              <S.Select
                name="height"
                value={height}
                onChange={onChange}
                style={{ border: "none" }}
              >
                <option>{user.height}</option>
                {Array.from({ length: 101 }, (_, index) => index + 120).map(
                  (value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  )
                )}
              </S.Select>
            </S.Box>
            <S.Box>
              <S.Select
                name="mbti"
                value={mbti}
                onChange={onChange}
                style={{ border: "none" }}
              >
                {user.mbti !== "" ? (
                  <option>{user.mbti}</option>
                ) : (
                  <option>MBTI</option>
                )}
                {mbtiList.map((mbti) => (
                  <option key={mbti} value={mbti}>
                    {mbti}
                  </option>
                ))}
              </S.Select>
            </S.Box>

            <ModalHobby
              formData={formData}
              handleHobbyClick={handleHobbyClick}
            />

            <ModalPersonality
              formData={formData}
              handlePersonalityClick={handlePersonalityClick}
            />
            <ModalIdeal
              formData={formData}
              handleIdealClick={handleIdealClick}
            />

            <S.Heading>한줄 자기소개</S.Heading>
            <S.Box>
              <S.Input
                name="introduce"
                value={introduce}
                placeholder={user.introduce}
                onChange={onChange}
              />
            </S.Box>
            <S.ButtonSection>
              <S.Button onClick={handleSubmit}>정보 수정하기</S.Button>
              <S.Button onClick={onClose}>Close</S.Button>
            </S.ButtonSection>
          </S.Modal>
        </ModalOverlay>
      )}
    </>
  );
};
export default UserProfileEdit;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding: 100px;
    margin-top: 20px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);

    width: 70%;
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin-bottom: 10px;
`;
