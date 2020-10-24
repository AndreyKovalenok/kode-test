import React from 'react';

import style from './style.module.scss';

function HeaderButton({ children }) {
  return (
    <button className={style.button}>{children}</button>
  )
}

export default HeaderButton;