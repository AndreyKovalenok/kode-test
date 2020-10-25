import React, { useContext } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { StateContext } from '../../store/StateContext';
import { AuthContext } from '../../store/AuthContext';

import style from './style.module.scss';

import HeaderButton from './HeaderButton';

import { SET_AUTH, CLEAR_STATE } from '../../store/ACTION_TYPES';


function Header() {
  const [,authDispatch] = useContext(AuthContext);
  const [,dispatch] = useContext(StateContext);

  const logoutHandler = () => {
    authDispatch({ type: SET_AUTH, payload: false });
    dispatch({ type: CLEAR_STATE });
  }

  return (
    <header className={style.header}>
      <Switch>
        <Route path="/card-page">
          <NavLink className={style.link} to="/">&lt; Back</NavLink>
        </Route>
      </Switch>
      <div className={style.headerLogut}>
        <HeaderButton clickHandler={logoutHandler}>Logout</HeaderButton>
      </div>
    </header>
  );
}

export default Header;