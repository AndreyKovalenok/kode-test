import React from 'react'

import style from './style.module.scss';

function Input({ title, name, type, placeholder, inputChangeHandler, value }) {
  return (
    <label className={style.label}>
      <span className={style.title}>{title}</span>
      <input 
        className={style.input} 
        type={type} 
        name={name}
        value={value}
        placeholder={placeholder}
        onInput={(evt) => inputChangeHandler(evt, name)}
      />
    </label>
  );
}

export default Input;