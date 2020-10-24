import React from 'react';

import style from './style.module.scss';

import MainLayout from '../../Layouts/MainLayout';
import Input from '../../components/UI/Input';
import NextButton from '../../components/UI/NextButton';

function Login() {
  return (
    <MainLayout>
      <form className={style.login}>
        <div className={style.row}>
          <Input 
            title="Login" 
            name="name" 
            type="text"
            placeholder="Введите логин" 
          />
        </div>
        <div className={style.row}>
          <Input 
            title="Password" 
            name="password" 
            type="password"
            placeholder="Введите пароль" 
          />
        </div>
        <NextButton />
      </form>
    </MainLayout>
  );
}

export default Login;