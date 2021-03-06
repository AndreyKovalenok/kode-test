import React, { createContext, useReducer } from 'react';

import { 
  SET_POKEMONS, 
  SET_POKEMONS_TYPES, 
  SET_POKEMONS_SUBTYPES,
  SET_TYPES_VALUE,
  SET_SUBTYPES_VALUE,
  SET_LOADING,
  SET_POKEMON,
  SET_PAGE,
  SET_TOTAL_COUNT,
  CLEAR_STATE,
} from './ACTION_TYPES';

export const pokemonApiUrl = 'https://api.pokemontcg.io/v1/';
export const StateContext = createContext([]);

function StateProvider({ children }) {
  const initialState = {
    pokemons: [],
    types: [],
    subtypes: [],
    page: '1',
    totalCount: 0,
    lastPage: 0,
    pageSize: 10,
    typesValue: '',
    subtypesValue: '',
    isLoading: false,
    pokemon: null,
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
      case SET_POKEMON:
        return {
          ...state,
          pokemon: payload,
        };
      case SET_PAGE:
        return {
          ...state,
          page: payload,
        };
      case CLEAR_STATE:
        return initialState;
      case SET_TOTAL_COUNT:
        return {
          ...state,
          totalCount: payload,
          lastPage: String(Math.ceil(payload / state.pageSize))
        };
      default:
        return state;
    }
  } 

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      { children }
    </StateContext.Provider>
  );
}

export default StateProvider;