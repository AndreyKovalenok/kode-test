import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import PasswordConfirmation from './pages/PasswordConfirmation';
import CategoriesPage from './pages/CategoriesPage';
import CardPage from './pages/CardPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Login} />
        <Route path="/password-confirmation" exact component={PasswordConfirmation} />
        <Route path="/categories-page" exact component={CategoriesPage} />
        <Route path="/ard-page" exact component={CardPage} />
      </Switch>
    </div>
  );
}

export default App;
