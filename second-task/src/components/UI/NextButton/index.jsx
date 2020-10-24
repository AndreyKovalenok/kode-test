import React from 'react';

import style from './style.module.scss';

function NextButton({ clickHandler }) {
  return (
    <button className={style.button} onClick={clickHandler}></button>
  )
}

export default NextButton;