import React from "react";
import { createGlobalStyle } from "styled-components";
import { Navbar } from "./NavBar/Navbar";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
    margin: 0;

  }
  h1,h2,h3 {
    font-family: 'Righteous', cursive;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <div>ole</div>
    </>
  );
}

export default App;
