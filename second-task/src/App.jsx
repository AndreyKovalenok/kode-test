import React, { useReducer, createContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import PasswordConfirmation from './pages/PasswordConfirmation';
import PokemonsPage from './pages/PokemonsPage';
import CardPage from './pages/CardPage';

import { 
  SET_POKEMONS, 
  SET_POKEMONS_TYPES, 
  SET_POKEMONS_SUBTYPES,
  SET_TYPES_VALUE,
  SET_SUBTYPES_VALUE,
  SET_LOADING,
} from './store/ACTION_TYPES';

export const StateContext = createContext();

function App() {
  const pokemonApiUrl = 'https://api.pokemontcg.io/v1/';

  const initialState = {
    pokemons: [],
    types: [],
    subtypes: [],
    typesValue: '',
    subtypesValue: '',
    isLoading: false,
  };
  
  function reducer(state, { type, payload }) {
    switch (type) {
      case SET_POKEMONS:
        return {
          ...state,
          pokemons: payload,
        };
      case SET_POKEMONS_TYPES: 
        return {
          ...state,
          types: payload,
        }; 
      case SET_POKEMONS_SUBTYPES: 
        return {
          ...state,
          subtypes: payload,
        };
      case SET_TYPES_VALUE: 
        return {
          ...state,
          typesValue: payload,
        };
      case SET_SUBTYPES_VALUE: 
        return {
          ...state,
          subtypesValue: payload,
        };
      case SET_LOADING: 
        return {
          ...state,
          isLoading: payload,
        };
      default:
        return state;
    }
  } 
  
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchPokemons = async function () {
      const generatePath = function () {
        let path = `${pokemonApiUrl}cards/?page=1`;
        if (state.typesValue) {
          path += `&types=${state.typesValue}`;  
        }
        if (state.subtypesValue) {
          path += `&subtype=${state.subtypesValue}`;
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
  }, [state.typesValue, state.subtypesValue]);
  
  async function fetchTypes() {
    const typesResponse = await fetch(`${pokemonApiUrl}types`)
    const { types } = await typesResponse.json();  
    dispatch({ type: SET_POKEMONS_TYPES, payload: types });
  
    const subtypesResponse = await fetch(`${pokemonApiUrl}subtypes`)
    const { subtypes } = await subtypesResponse.json();
    dispatch({ type: SET_POKEMONS_SUBTYPES, payload: subtypes });
  }
   
  function setTypesValue({ filter, value}) {
    if (filter === 'Type') {
      dispatch({ type: SET_TYPES_VALUE, payload: value });
    } else if (filter === 'Subtype') {
      dispatch({ type: SET_SUBTYPES_VALUE, payload: value });
    }
  }

  return (
    <StateContext.Provider value={state}>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/password-confirmation" component={PasswordConfirmation} />
          <Route path="/">
            <PokemonsPage 
              fetchTypes={fetchTypes} 
              setTypesValue={setTypesValue}
            />
          </Route>
          <Route path="/card-page" component={CardPage} />
        </Switch>
      </div>
    </StateContext.Provider>
    
  );
}

export default App;
