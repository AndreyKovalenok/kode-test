import React, { useEffect, useContext } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { StateContext, pokemonApiUrl } from './store/StateContext';
import { AuthContext } from './store/AuthContext';

import Login from './pages/Login';
import PasswordConfirmation from './pages/PasswordConfirmation';
import PokemonsPage from './pages/PokemonsPage';
import CardPage from './pages/CardPage';

import { 
  SET_POKEMONS,
  SET_TYPES_VALUE,
  SET_SUBTYPES_VALUE,
  SET_LOADING,
} from './store/ACTION_TYPES';

function App() {
  const history = useHistory();
  const [{ typesValue, subtypesValue, page }, dispatch] = useContext(StateContext);
  const [{ isLoggedIn }] = useContext(AuthContext);

  useEffect(() => {
    if(!isLoggedIn) {
      const fetchPokemons = async function () {
        const generatePath = function () {
          let path = `${pokemonApiUrl}cards/?pageSize=10&total-count=500&page=${page}`;
          if (typesValue) {
            path += `&types=${typesValue}`;  
          }
          if (subtypesValue) {
            path += `&subtype=${subtypesValue}`;
          }
          return path;
        }
        dispatch({ type: SET_LOADING, payload: true });
        const pokemonResponse = await fetch(generatePath());
        const { cards } = await pokemonResponse.json();
        dispatch({ type: SET_LOADING, payload: false });
        dispatch({ type: SET_POKEMONS, payload: cards }); 
      };
  
      fetchPokemons();
    } else {
      // history.push('/login')
    }
  }, [page, typesValue, subtypesValue, isLoggedIn, history, dispatch]);
   
  function setTypesValue({ filter, value }) {
    if (filter === 'Type') {
      dispatch({ type: SET_TYPES_VALUE, payload: value });
    } else if (filter === 'Subtype') {
      dispatch({ type: SET_SUBTYPES_VALUE, payload: value });
    }
  }

  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/password-confirmation" component={PasswordConfirmation} />
        <Route path="/" exact>
          <PokemonsPage 
            pokemonApiUrl={pokemonApiUrl}
            dispatch={dispatch}
            setTypesValue={setTypesValue}
          />
        </Route>
        <Route path="/card-page" component={CardPage} />
      </Switch>
    </div>
  );
}

export default App;
