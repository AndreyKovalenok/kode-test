import React from 'react';

import style from './style.module.scss';

function HelpMessage({ children }) {
  return (
    <p className={style.message}>{children}</p>
  );
}

export default HelpMessage;