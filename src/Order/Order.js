import React from "react";
import styled from "styled-components";
import {
  DialogContent,
  DialogFooter,
  ConfirmButton
} from "../FoodDialog/FoodDialog";

const OrderStyled = styled.div`
  position: fixed;
  right: 0px;
  top: 48px;
  width: 340px;
  background-color: white;
  height: calc(100% - 48px);
  z-index: 10;
  box-shadow: 4px 0 5px 5px gray;
  display: flex;
  flex-direction: column;
`;

const OrderContent = styled.div`
  padding: 20px;
  height: 100%;
`;

export function Order() {
  return (
    <OrderStyled>
      <OrderContent>Your order is empty!</OrderContent>
      <DialogFooter>
        <ConfirmButton>Checkout</ConfirmButton>
      </DialogFooter>
    </OrderStyled>
  );
}
