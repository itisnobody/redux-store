import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../header";
import { CartPage, HomePage } from "../pages";

const App = () => {

  return (
    <main role={'main'} className={'container'}>
      <Header numItems={5} />
      <Switch>
        <Route path={"/"} component={HomePage}  exact />
        <Route path={"/cart"} component={CartPage} />
      </Switch>
    </main>
  );
};

export default App;