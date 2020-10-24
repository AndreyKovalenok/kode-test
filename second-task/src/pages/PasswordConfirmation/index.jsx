import React from 'react';

import style from './style.module.scss';

import MainLayout from '../../Layouts/MainLayout';
import Form from '../../components/Form';
import Input from '../../components/UI/Input';
import NextButton from '../../components/UI/NextButton';


function PasswordConfirmation() {
  const inputs = [
    {
      title: "Code from SMS",
      name: "sms-code",
      type: "text",
      placeholder: "Введите код из СМС",
    },
  ];

  return (
    <MainLayout>
      <Form inputs={inputs}></Form>
    </MainLayout>
  );
}

export default PasswordConfirmation;