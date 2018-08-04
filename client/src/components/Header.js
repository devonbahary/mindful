import React from 'react';

const Header = (props) => (
  <header className="Header">
    <div className={props.onMainButton ? "Header__mainButton" : "Header__mainButton--disable"} onClick={props.onMainButton}>
      <div className={`icon ${props.mainButtonIcon}`} />
    </div>
    <div className="Header__contents">
      {props.headerText}
      <div className="Header__buttons">
        {props.children}
      </div>
    </div>
  </header>
);

export default Header;
