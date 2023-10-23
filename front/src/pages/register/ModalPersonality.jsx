import React, { useState } from "react";
import * as S from "./style";
import styled from "styled-components";
import { personalityList } from "../../constants/registerConstants";
import { useToggle } from "../../components/hooks/useToggle";
import { isMaxArrayReached } from "../../util/arrayUtils";
export const ModalPersonality = ({ formData, handlePersonalityClick }) => {
  const { personality } = formData;
  const { opened, onOpen, onClose } = useToggle();
  const isMaxPersonalityReached = isMaxArrayReached(personality, 5);

  return (
    <>
      <S.ToggleButtonWrapper>
        <S.Button onClick={onOpen}>
          <p style={{ textAlign: "center" }}>내가 생각하는 나</p>
        </S.Button>
      </S.ToggleButtonWrapper>

      {opened && (
        <S.Modal>
          <S.CloseButton onClick={onClose}>X</S.CloseButton>
          <h3 style={{ textAlign: "center" }}>내 성격</h3>
          {isMaxPersonalityReached && (
            <p style={{ color: "red", textAlign: "center" }}>
              최대 5개까지 선택가능합니다.
            </p>
          )}
          <ButtonContainer>
            {personalityList.map((elements, index) => (
              <ModalButton
                key={index}
                active={personality.includes(elements)}
                onClick={() => {
                  if (
                    personality.includes(elements) ||
                    personality.length < 5
                  ) {
                    handlePersonalityClick(elements);
                  }
                }}
                disabled={
                  personality.length > 5 && !personality.includes(elements)
                }
              >
                <div style={{ textAlign: "center" }}>{elements}</div>
              </ModalButton>
            ))}
          </ButtonContainer>
          <S.ToggleButtonWrapper>
            <S.Button
              onClick={onClose}
              style={{ width: "15%", marginTop: "5px" }}
            >
              <p style={{ textAlign: "center" }}>닫기</p>
            </S.Button>
          </S.ToggleButtonWrapper>
        </S.Modal>
      )}
      <S.Box>
        {personality.length > 0 && (
          <S.HobbyBoxContainer>
            {personality.map((item, index) => (
              <PersonBox key={index} style={{ marginLeft: "20px" }}>
                {item}
              </PersonBox>
            ))}
          </S.HobbyBoxContainer>
        )}
      </S.Box>
    </>
  );
};
const PersonBox = styled.div`
  width: 3.8rem;
  height: 2rem;
  border-radius: 2rem;
  background-color: #87d5fc;
  /* margin: 0rem 0.5rem; */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.7rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  flex: 1;
`;
const ModalButton = styled.div`
  background-color: ${({ active }) => (active ? "#fa9393" : "white")};
  width: 3.5rem;
  /* height: 2rem; */
  border-radius: 1rem;
  padding: 10px;
  border: 1px solid black;
  cursor: pointer;
  font-size: 0.7rem;
`;
