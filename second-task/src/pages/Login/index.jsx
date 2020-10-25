import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../store/AuthContext';

import MainLayout from '../../Layouts/FormLayout';
import Form from '../../components/Form';

import { SET_AUTH } from '../../store/ACTION_TYPES';

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

  const history = useHistory();
  const [{ users }, authDispatch] = useContext(AuthContext);

  const submitHandler = (evt, inputs) => {
    evt.preventDefault();
    const user = users.find(({ login }) => login === inputs[0].value);
    if (user) {
      if (user.password === inputs[1].value) {
        authDispatch({ type: SET_AUTH, payload: true });
        history.push('/');
      }
    }
  }

  return (
    <MainLayout>
      <Form inputs={inputs} submitHandler={submitHandler}></Form>
    </MainLayout>
  );
}

export default Login;