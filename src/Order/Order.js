import React from "react";
import styled from "styled-components";
import {
  DialogContent,
  DialogFooter,
  ConfirmButton,
  getPrice,
} from "../FoodDialog/FoodDialog";
import { formatPrice } from "../Data/FoodData";

const database = window.firebase.database();

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

const OrderContent = styled(DialogContent)`
  padding: 20px;
  height: 100%;
`;

const OrderContainer = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid gray;
  ${({ editable }) =>
    editable
      ? `
  &:hover {
    cursor: pointer;
    background-color: #e7e7e7;
  }`
      : `
  pointer-events: none;`}
`;

const OrderItem = styled.div`
  padding: 10px 0;
  display: grid;
  grid-template-columns: 20px 150px 20px 60px;
  justify-content: space-between;
`;

const DetailItem = styled.div`
  color: gray;
  font-size: 10px;
`;

function sendOrder(orders, { email, displayName }) {
  const newOrderRef = database.ref("orders").push();

  const newOrders = orders.map((order) => {
    return Object.keys(order).reduce((acc, orderKey) => {
      if (!order[orderKey]) {
        //undefined value
        return acc;
      }
      if (orderKey === "toppings") {
        return {
          ...acc,
          [orderKey]: order[orderKey]
            .filter(({ checked }) => checked)
            .map(({ name }) => name),
        };
      }
      return {
        ...acc,
        [orderKey]: order[orderKey],
      };
    }, {});
  });

  newOrderRef.set({
    order: newOrders,
    email,
    displayName,
  });
}

export function Order({ orders, setOrders, setOpenFood, login, loggedIn }) {
  const subtotal = orders.reduce((total, order) => {
    return total + getPrice(order);
  }, 0);

  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  const deleteItem = (index) => {
    const newOrders = [...orders];
    newOrders.splice(index, 1);
    setOrders(newOrders);
  };

  return (
    <OrderStyled>
      {orders.length === 0 ? (
        <OrderContent>Your order is empty!</OrderContent>
      ) : (
        <OrderContent>
          <OrderContainer>Your order: </OrderContainer>
          {orders.map((order, index) => (
            <OrderContainer editable key={index}>
              <OrderItem
                onClick={() => {
                  setOpenFood({ ...order, index });
                }}
              >
                <div>{order.quantity}</div>
                <div>{order.name}</div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(index);
                  }}
                >
                  <span role="img" aria-label="close">
                    ❌
                  </span>
                </div>
                <div>{formatPrice(getPrice(order))}</div>
              </OrderItem>
              <DetailItem>
                {/*ovdje cu izvrtiti sve chekirane toppingse i prikazati ih u  narudzbi*/}
                {order.toppings
                  .filter((t) => t.checked)
                  .map((topping) => topping.name)
                  .join(", ")}
              </DetailItem>
              {order.choice && <DetailItem>{order.choice}</DetailItem>}
            </OrderContainer>
          ))}
          <OrderContainer>
            <OrderItem>
              <div />
              <div>Sub-total</div>
              <div>{formatPrice(subtotal)}</div>
            </OrderItem>
            <OrderItem>
              <div />
              <div>Tax</div>
              <div>{formatPrice(tax)}</div>
            </OrderItem>
            <OrderItem>
              <div />
              <div>Total</div>
              <div>{formatPrice(total)}</div>
            </OrderItem>
          </OrderContainer>
        </OrderContent>
      )}

      <DialogFooter>
        <ConfirmButton
          onClick={() => {
            if (loggedIn) {
              // console.log("logged in");
              // setOpenOrderDialog(true)
              sendOrder(orders, loggedIn);
            } else {
              login();
              // login(setOpenorderDialog)
            }
          }}
        >
          Checkout
        </ConfirmButton>
      </DialogFooter>
    </OrderStyled>
  );
}
