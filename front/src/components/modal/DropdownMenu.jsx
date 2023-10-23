import React from 'react';

import styled from "styled-components";

const DropdownMenu = ({ options, selectedOption, handleOptionChange }) => {
  return (
    <StyledDropdown value={selectedOption} onChange={handleOptionChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledDropdown>
  );
};

export default DropdownMenu;


const StyledDropdown = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #E0E0E0;
  background-color: #FFFFFF;
  font-size: 16px;
  font-family: 'KIMM_Bold';
  appearance: none;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    border-color: #3b0b0b;
  }

  &:focus {
    outline: none;
    border-color: #f7cbd0;
  }
`;
