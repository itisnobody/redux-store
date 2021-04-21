import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./header.scss";

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

const mapStateToProps = ({shoppingCart: {orderTotal, numsTotal}}) => {
  return {
    total: orderTotal,
    numItems: numsTotal
  };
};

export default connect(mapStateToProps)(Header);