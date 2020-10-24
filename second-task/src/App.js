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
        <Route path="/login" component={Login} />
        <Route path="/" exact component={PasswordConfirmation} />
        <Route path="/categories-page" exact component={CategoriesPage} />
        <Route path="/card-page" exact component={CardPage} />
      </Switch>
    </div>
  );
}

export default App;
