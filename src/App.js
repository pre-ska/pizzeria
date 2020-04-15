import React from "react";
import { Navbar } from "./NavBar/Navbar";
import { Banner } from "./Banner/Banner";
import { Menu } from "./Menu/Menu";
import { GlobalStyle } from "./Styles/GlobalStyle";
import { FoodDialog } from "./FoodDialog/FoodDialog";
import { Order } from "./Order/Order";
import { useOpenFood } from "./Hooks/useOpenFood";
import { useOrders } from "./Hooks/useOrders";
import { useTitle } from "./Hooks/useTitle";
import { useAuthentication } from "./Hooks/useAuthntication";

function App() {
  const openFood = useOpenFood(); // openFood, setOpenFood - hook useOpenFood
  const orders = useOrders(); // orders, setOrders - hook useOrders vrati array narudzbi.... orders

  const auth = useAuthentication();

  useTitle({ ...openFood, ...orders });
  return (
    <>
      <GlobalStyle />
      <FoodDialog {...openFood} {...orders} />
      <Navbar {...auth} />
      <Order {...openFood} {...orders} {...auth} />
      <Banner />
      <Menu {...openFood} />
    </>
  );
}

export default App;
