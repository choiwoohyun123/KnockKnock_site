import React from 'react';
import styled from 'styled-components';



const GenderInfo = ({ total, filled, color, gender }) => {
  let people = [];

  for (let i = 0; i < total; i++) {
    people.push(<Person key={i} $filled={i < filled} color={color} />);
  }

  return <TotalPeople>{gender} {people}</TotalPeople>;
};

export default GenderInfo;

const TotalPeople = styled.div`
  display: inline-flex;
  margin-right: 5px;
  align-items: center;
  margin-bottom: 10px;
`;

const Person = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: ${props => props.$filled ? props.color : '#ccc'};
  margin-left: 7px;
`;