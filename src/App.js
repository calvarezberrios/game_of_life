  
import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import AppBar from './components/AppBar';
import FooterBar from "./components/Footer";
import Grid from './components/Grid';
import Info from './components/Info';

function App() {
  

  return (
    <div className="App">
      <AppBar />
      <MainContent>
        <Grid />
        <Info />
      </MainContent>
      
      <FooterBar />
    </div>
  );
}

export default App;

const MainContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items; center;
  padding: 30px 0;
`;