import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogShadow,
  ConfirmButton,
} from "../FoodDialog/FoodDialog";

export function OrderDialog({
  openOrderDialog,
  setOpenOrderDialog,
  setOrders,
}) {
  return openOrderDialog ? (
    <>
      <DialogShadow />
      <Dialog>
        <DialogContent>
          <h2>
            <span role="img" aria-label="delivery">
              🚚
            </span>{" "}
            Your order is on the way
          </h2>
          <p>
            You have been emailed confirmation of your order. Thanks for using
            Pizzeria V
          </p>
        </DialogContent>
        <DialogFooter>
          <ConfirmButton
            onClick={() => {
              setOrders([]);
              setOpenOrderDialog();
            }}
          >
            I'm still hungry
          </ConfirmButton>
        </DialogFooter>
      </Dialog>
    </>
  ) : (
    <div />
  );
}
