import React, { useEffect, useState } from "react";
import * as S from "./style";
import { mbtiList } from "../../constants/registerConstants";
import { ModalHobby } from "./ModalHobby";
import { ModalPersonality } from "./ModalPersonality";
import { ModalIdeal } from "./ModalIdeal";
const maxSelect = 6;
const OptionalInputs = () => {
  const [formData, setFormData] = useState({
    height: "",
    mbti: "",
    hobby: [],
    personality: [],
    ideal: [],
    introduce: "",
  });
  const { height, mbti, hobby, personality, ideal, introduce } = formData;
  const [isHeightInt, setIsHeightInt] = useState("");
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
    onArrayChange(hobby, element, "hobby", maxSelect);
  };

  const handlePersonalityClick = (element) => {
    onArrayChange(personality, element, "personality", maxSelect);
  };

  const handleIdealClick = (element) => {
    onArrayChange(ideal, element, "ideal", maxSelect);
  };

  OptionalInputs.getFormData = () => {
    return formData;
  };

  return (
    <>
      <S.Box>
        <S.Select
          name="height"
          value={height}
          onChange={onChange}
          style={{ border: "none" }}
        >
          <option>키</option>
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
          <option>MBTI</option>
          {mbtiList.map((mbti) => (
            <option key={mbti} value={mbti}>
              {mbti}
            </option>
          ))}
        </S.Select>
      </S.Box>
      <ModalHobby formData={formData} handleHobbyClick={handleHobbyClick} />
      <ModalPersonality
        formData={formData}
        handlePersonalityClick={handlePersonalityClick}
      />
      <ModalIdeal formData={formData} handleIdealClick={handleIdealClick} />

      <S.InputBox style={{ marginTop: "20px" }}>
        <input
          id="introduce"
          type="text"
          name="introduce"
          value={introduce}
          placeholder="자기소개"
          onChange={onChange}
        />
        <label htmlFor="height">자기소개</label>
      </S.InputBox>
    </>
  );
};

export default OptionalInputs;
