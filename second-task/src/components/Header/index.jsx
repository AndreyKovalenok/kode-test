import React from 'react';

import style from './style.module.scss';

import HeaderButton from './HeaderButton';

function Header() {
  return (
    <header className={style.header}>
      <div className={style.headerLogut}>
        <HeaderButton>Logout</HeaderButton>
      </div>
    </header>
  );
}

export default Header;