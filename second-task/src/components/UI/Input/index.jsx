import React from 'react'

import style from './style.module.scss';

function Input({ 
  title, 
  name, 
  type, 
  placeholder, 
  inputChangeHandler, 
  value, 
  touched, 
  message 
}) {
  return (
    <label className={style.label}>
      <span className={style.title}>{title}</span>
      <input 
        autoComplete="off"
        className={style.input} 
        type={type}  
        name={name}
        value={value}
        placeholder={placeholder} 
        onInput={inputChangeHandler}
      />
      {touched && message && <p className={style.message}>{message}</p>}
    </label>
  );
}

export default Input;