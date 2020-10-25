import React from 'react';

import style from './style.module.scss';

function HeaderButton({ children, clickHandler }) {
  return (
    <button onClick={clickHandler} className={style.button}>{children}</button>
  )
}

export default HeaderButton;