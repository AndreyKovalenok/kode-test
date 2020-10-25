import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../store/AuthContext';

import style from './style.module.scss';

import MainLayout from '../../Layouts/FormLayout';
import Input from '../../components/UI/Input';
import NextButton from '../../components/UI/NextButton';

import { SET_AUTH } from '../../store/ACTION_TYPES';

function Login() {
  const [inputsValue, setInputValue] = useState({ name: '', password: '' });
  const { name: nameValue, password: passwordValue } =  inputsValue;
  const history = useHistory();
  const [{ users }, authDispatch] = useContext(AuthContext);

  const submitHandler = (evt) => {
    evt.preventDefault();
    const user = users.find(({ login }) => login === nameValue);
    if (user) {
      if (user.password === passwordValue) {
        authDispatch({ type: SET_AUTH, payload: true });
        history.push('/');
      }
    }
  }

  const inputChangeHandler = (evt, name) => {
    setInputValue({
      ...inputsValue,
      [name]: evt.target.value,
    })
  };

  return (
    <MainLayout>
      <form 
        method='POST'
        action='/'
        className={style.form}
        onSubmit={(evt) => submitHandler(evt)}
      >
        <div className={style.row}>
          <Input 
            title="Login"  
            name="name"  
            type="text"
            placeholder="Введите логин" 
            value={nameValue}
            inputChangeHandler={inputChangeHandler}
          />
        </div>
        <div className={style.row}>
          <Input 
            title="Password" 
            name="password" 
            type="password"
            placeholder="Введите пароль" 
            value={passwordValue}
            inputChangeHandler={inputChangeHandler}
          />
        </div>
        <div className={style.buttonWrap}>
            <NextButton />
        </div>
      </form>
    </MainLayout>
  );
}

export default Login;