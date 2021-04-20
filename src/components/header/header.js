import React from "react";
import { Link } from "react-router-dom";

import "./header.css";

const Header = ({numItems, total}) => {
  return (
    <header className={'header row'}>
      <Link to={'/'}>
        <div className={'logo text-dark'}>ReStore</div>
      </Link>
      <Link to={'/cart'}>
        <div className={'header-cart'}>
          <i className={'header-cart-icon fa fa-shopping-cart'}>
            {numItems} items (${total})
          </i>
        </div>
      </Link>
    </header>
  );
};

export default Header;