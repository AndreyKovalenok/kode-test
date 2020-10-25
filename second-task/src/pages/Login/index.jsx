import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../../store/AuthContext';

import style from './style.module.scss';

import MainLayout from '../../Layouts/FormLayout'; 
import Input from '../../components/UI/Input';
import NextButton from '../../components/UI/NextButton';

import { SET_AUTH } from '../../store/ACTION_TYPES';

const validate = ({ name, password }) => {
  const errors = {};
  if (!name) {
    errors.name = 'Это обязательное поле';
  } else if (name.length < 4) {
    errors.name = `Длина поля должна быть не менее 4 символов, сейчас ${name.length}`;
  } 
  if (!password) {
    errors.password = 'Это обязательное поле';
  } else if (password.length < 6) {
    errors.password = `Длина поля должна быть не менее 6 символов, сейчас ${password.length}`;
  }

  return errors;
}

function Login() {
  const history = useHistory();
  const [{ users }, authDispatch] = useContext(AuthContext);

  const { handleSubmit, handleChange, values: { name, password }, errors, touched } = useFormik({
    initialValues: {
      name: '',
      password: '', 
    },
    validate,
    onSubmit() {
      const user = users.find(({ login }) => login === name);
      if (user) {
        if (user.password === password) {
          authDispatch({ type: SET_AUTH, payload: true });
          history.push('/');
        }
      }
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
            title="Login"  
            name="name"  
            type="text"
            placeholder="Введите логин" 
            value={name}
            inputChangeHandler={handleChange}
            touched={touched.name}
            message={errors.name}
          />
        </div>
        <div className={style.row}>
          <Input 
            title="Password" 
            name="password" 
            type="password"
            placeholder="Введите пароль" 
            value={password}
            inputChangeHandler={handleChange}
            touched={touched.password}
            message={errors.password}
          />
        </div>
        <div className={style.buttonWrap}>
            <NextButton />
        </div>
        <NavLink to="/password-confirmation" className={style.link}>Использовать одноразовый пароль</NavLink>
      </form>
    </MainLayout>
  );
}

export default Login;