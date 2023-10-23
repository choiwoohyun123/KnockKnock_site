import Layout from "./components/sections/Layout";
import "./index.css";
import React, { useState, useEffect, useReducer, createContext } from "react";
import UserProvider from "./context/user/UserProvider";

const App = () => {

  return (
    <UserProvider>
      <Layout />
    </UserProvider>
  );
};

export default App;
