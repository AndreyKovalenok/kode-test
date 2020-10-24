import React from 'react';

// import style from './style.module.scss';

import MainLayout from '../../Layouts/FormLayout';
import Form from '../../components/Form';

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