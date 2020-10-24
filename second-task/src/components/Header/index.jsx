import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import style from './style.module.scss';

import HeaderButton from './HeaderButton';

function Header() {
  return (
    <header className={style.header}>
      <Switch>
        <Route path="/card-page">
          <NavLink className={style.link} to="/">&lt; Back</NavLink>
        </Route>
      </Switch>
      <div className={style.headerLogut}>
        <HeaderButton>Logout</HeaderButton>
      </div>
    </header>
  );
}

export default Header;