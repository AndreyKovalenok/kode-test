import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { AuthContext } from '../../store/AuthContext';

import style from './style.module.scss';

import MainLayout from '../../Layouts/FormLayout';
import Input from '../../components/UI/Input';
import NextButton from '../../components/UI/NextButton';

import { SET_AUTH } from '../../store/ACTION_TYPES';

function PasswordConfirmation() {
  const history = useHistory();
  const [, authDispatch] = useContext(AuthContext);

  const [randomPas, setRandomPas] = useState('1234');
  useEffect(() => {
    const randomStr = String(Math.random()).slice(2, 2 + Math.max(1, Math.min(4)))
    setRandomPas(randomStr);
    alert(`Пароль: ${randomStr}`);
  }, []);

  const validate = ({ password }) => {
    const errors = {};
    console.log(password, randomPas);
    if (password !== randomPas) {
      errors.password = 'Пароли не совпадают';
    } 

    return errors;
  }

  const { handleSubmit, handleChange, values: { password }, errors, touched } = useFormik({
    initialValues: {
      password: '', 
    },
    validate,
    onSubmit() {
      authDispatch({ type: SET_AUTH, payload: true });
      history.push('/');
    }
  });

  return (
    <MainLayout>
      <form 
        method='POST'
        action='/'
        className={style.form}
        onSubmit={handleSubmit}
      >
        <div className={style.row}>
          <Input 
            title="Code from SMS"  
            name="password"  
            type="text"
            placeholder="Введите код из СМС" 
            value={password}
            inputChangeHandler={handleChange}
            touched={touched.password}
            message={errors.password}
          />
        </div>
        <div className={style.buttonWrap}>
          <NextButton />
        </div>
        <NavLink to="/login" className={style.link}>Использовать логин и пароль</NavLink>
      </form>
    </MainLayout>
  );
}

export default PasswordConfirmation;