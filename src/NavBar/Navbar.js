import React from "react";
import styled from "styled-components";
import { pizzaRed } from "../Styles/colors";
import { Title } from "../Styles/Title";

const NavbarStyled = styled.div`
  background-color: ${pizzaRed};
  padding: 10px;
`;

const Logo = styled(Title)`
  font-size: 20px;
  color: white;
  text-shadow: 1px 1px 4px #380502;
`;

export function Navbar() {
  return (
    <NavbarStyled>
      <Logo>Pizerria V 🍕</Logo>
    </NavbarStyled>
  );
}
