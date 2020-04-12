import styled from "styled-components";
import { Title } from "../Styles/Title";

export const FoodGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding-bottom: 40px;
`;

export const FoodLabel = styled(Title)`
  position: absolute;
  background-color: rgba(256, 256, 256, 0.8);
  padding: 5px;
`;

export const Food = styled.div`
  height: 100px;
  padding: 10px;
  font-size: 20px;
  background-image: ${({ img }) => `url(${img})`};
  background-position: center;
  background-size: cover;
  filter: contrast(75%);
  border-radius: 11px;
  margin-top: 5px;
  transition: all 0.1s linear;
  box-shadow: 0px 0px 2px 0px #a37575;
  &:hover {
    cursor: pointer;
    margin-top: 0px;
    margin-bottom: 5px;
    filter: contrast(100%);
    box-shadow: 0px 0px 10px 0px #a37575;
  }
`;
