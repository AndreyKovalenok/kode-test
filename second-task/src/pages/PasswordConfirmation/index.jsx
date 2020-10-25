import React from 'react';

import style from './style.module.scss';

import MainLayout from '../../Layouts/FormLayout';
import Input from '../../components/UI/Input';
import NextButton from '../../components/UI/NextButton';

function PasswordConfirmation() {
  return (
    <MainLayout>
      <form 
        method='POST'
        action='/'
        className={style.form}
      >
        <div className={style.row}>
          <Input 
            title="Code from SMS"  
            name="sms-code"  
            type="text"
            placeholder="Введите код из СМС" 
          />
        </div>
        <div className={style.buttonWrap}>
            <NextButton />
        </div>
      </form>
    </MainLayout>
  );
}

export default PasswordConfirmation;