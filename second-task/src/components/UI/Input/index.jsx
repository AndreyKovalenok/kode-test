import React from 'react'

import style from './style.module.scss';

function Input({ title, name, type, placeholder }) {
  return (
    <label className={style.label}>
      <span className={style.title}>{title}</span>
      <input 
        className={style.input} 
        type={type} 
        name={name}
        placeholder={placeholder}
      />
    </label>
  );
}

export default Input;