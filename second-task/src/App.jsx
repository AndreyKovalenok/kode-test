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
  SET_LOADING,
  SET_TOTAL_COUNT,
} from './store/ACTION_TYPES';

function App() {
  const history = useHistory();
  const [{ typesValue, subtypesValue, page, pageSize }, dispatch] = useContext(StateContext);
  const [{ isLoggedIn }] = useContext(AuthContext);

  useEffect(() => {
    if(isLoggedIn) {
      /**
       * Получение покемонов, при первой загрузке страницы отображаются покемоны с первой страницы
       */
      const fetchPokemons = async function () {
        const generatePath = function () {
          let path = `${pokemonApiUrl}cards/?pageSize=${pageSize}&page=${page}`;
          // Формирование строки запроса с параметрами, в зависимости от выбранных значений селектов
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
        dispatch({ type: SET_TOTAL_COUNT, payload: pokemonResponse.headers.get('total-count') });
        const { cards } = await pokemonResponse.json();
        dispatch({ type: SET_LOADING, payload: false });
        dispatch({ type: SET_POKEMONS, payload: cards }); 
      };
  
      fetchPokemons();
    } else {
      history.push('/login')
    }
  }, [page, typesValue, pageSize, subtypesValue, isLoggedIn, history, dispatch]);

  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/password-confirmation" component={PasswordConfirmation} />
        <Route path="/" exact component={PokemonsPage} />
        <Route path="/card-page" component={CardPage} />
      </Switch>
    </div>
  );
}

export default App;
