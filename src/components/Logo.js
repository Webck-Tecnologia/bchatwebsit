import React from 'react';
import LogoStyles from '../styles/LogoStyles';
import logo from './bchat-logo.png'

function Logo() {
  return (
    <LogoStyles to="/">
      <img src={logo}/>
    </LogoStyles>
  );
}

export default Logo;
