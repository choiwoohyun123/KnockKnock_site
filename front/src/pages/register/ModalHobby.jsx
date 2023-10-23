import React, { useEffect, useState } from "react";
import * as S from "./style";
import styled from "styled-components";
import { hobbyList } from "../../constants/registerConstants";
import { useToggle } from "../../components/hooks/useToggle";
import { isMaxArrayReached } from "../../util/arrayUtils";
export const ModalHobby = ({ formData, handleHobbyClick }) => {
  const { hobby } = formData;
  const { opened, onOpen, onClose } = useToggle();
  const isMaxHobbyReached = isMaxArrayReached(hobby, 5);

  return (
    <>
      <S.ToggleButtonWrapper>
        <S.Button onClick={onOpen}>
          <p style={{ textAlign: "center" }}>취미 선택하기</p>
        </S.Button>
      </S.ToggleButtonWrapper>
      {opened && (
        <S.Modal>
          <S.CloseButton onClick={onClose}>X</S.CloseButton>
          <h3 style={{ textAlign: "center" }}>취미</h3>
          {isMaxHobbyReached && (
            <p style={{ color: "red", textAlign: "center" }}>
              최대 5개까지 선택가능합니다.
            </p>
          )}
          <ButtonContainer>
            {hobbyList.map((elements, index) => (
              <ModalButton
                key={index}
                active={hobby.includes(elements)}
                onClick={() => {
                  if (hobby.includes(elements) || hobby.length < 5) {
                    handleHobbyClick(elements);
                  }
                }}
                disabled={hobby.length > 5 && !hobby.includes(elements)}
              >
                <div style={{ textAlign: "center" }}>{elements}</div>
              </ModalButton>
            ))}
          </ButtonContainer>
          {/* <ModalButton onClick={onClose}>Close</ModalButton> */}
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
        {hobby.length > 0 && (
          <S.HobbyBoxContainer>
            {hobby.map((item, index) => (
              <HobbyBox key={index} style={{ marginLeft: "20px" }}>
                {item}
              </HobbyBox>
            ))}
          </S.HobbyBoxContainer>
        )}
      </S.Box>
    </>
  );
};
const MultiCheckBox = styled.button`
  width: 3.8rem;
  height: 2rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.7rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;
const HobbyBox = styled.div`
  width: 3.8rem;
  height: 2rem;
  border-radius: 2rem;
  background-color: #fa9393;
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
