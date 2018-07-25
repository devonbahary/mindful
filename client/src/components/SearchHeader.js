import React from 'react';

const searchHeader = (props) => (
  <header className="SearchHeader">
    <div className="SearchHeader__backButton">
      <div className="icon ion-md-arrow-round-back" />
    </div>
    <div className="SearchHeader__searchBox">
      <input
        type="text"
        value={props.searchValue}
        onChange={props.onSearchChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        autoFocus
      />
    </div>
  </header>
);

export default searchHeader;
