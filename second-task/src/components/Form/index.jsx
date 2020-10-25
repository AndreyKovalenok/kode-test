import React, { useState } from 'react'

import style from './style.module.scss';

import Input from '../UI/Input';
import NextButton from '../UI/NextButton';

function Form({ method = 'GET', action = '/', inputs = [], submitHandler }) {
  const initialState = inputs.map(({ name }) => ({name, value: ''}));
  const [inputsState, setInputValue] = useState(initialState);

  const inputChangeHandler = (evt, inputName) => {
    setInputValue(inputsState.map(({ name, value }) => {
      if (name === inputName) {
        return { name, value: evt.target.value }
      } else {
        return { name, value }
      }
    }));
  }

  return (
    <form 
      method={method}
      action={action}
      className={style.form}
      onSubmit={(evt) => submitHandler(evt, inputsState)}
    >
      {
        inputs.map(({ title, name, type, placeholder }, index) => (
          <div key={title + index} className={style.row}>
            <Input 
              title={title} 
              name={name} 
              type={type}
              placeholder={placeholder} 
              inputChangeHandler={inputChangeHandler}
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