import React from 'react';

import style from './style.module.scss';

import MainLayout from '../../Layouts/MainLayout';
import Form from '../../components/Form';
import Input from '../../components/UI/Input';
import NextButton from '../../components/UI/NextButton';

function Login() {
  const inputs = [
    {
      title: "Login",
      name: "name",
      type: "text",
      placeholder: "Введите логин",
    },
    {
      title: "Password",
      name: "password",
      type: "password",
      placeholder: "Введите пароль",
    },
  ];

  return (
    <MainLayout>
      <Form inputs={inputs}></Form>
    </MainLayout>
  );
}

export default Login;