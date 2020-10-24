import React from 'react';

import style from './style.module.scss';

import Input from '../UI/Input';
import NextButton from '../UI/NextButton';

function Form({ method = 'GET', action = '/', inputs = [] }) {
  return (
    <form 
      method={method}
      action={action}
      className={style.form}
    >
      {
        inputs.map(({ title, name, type, placeholder }, index) => (
          <div key={title + index} className={style.row}>
            <Input 
              title={title} 
              name={name} 
              type={type}
              placeholder={placeholder} 
            />
          </div>
        ))
      }
      <div className={style.buttonWrap}>
          <NextButton />
        </div>
    </form>
  )
}

export default Form;