import React from 'react';

import style from './style.module.scss';

function ModalLayout({ children }) {
  return (
    <div className={style.layout}>
      <div className={style.content}>{children}</div>
    </div>
  );  
}

export default ModalLayout;