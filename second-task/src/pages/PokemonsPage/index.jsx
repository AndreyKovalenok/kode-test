import React, { useContext, useEffect } from 'react';
import { StateContext } from '../../App';

import style from './style.module.scss';

import ContentLayout from '../../Layouts/ContentLayout';
import Header from '../../components/Header';
import Select from '../../components/UI/Select';
import Loader from '../../components/UI/Loader';
import Pokemon from './Pokemon';
import HelpMessage from './HelpMessage';

import { SET_POKEMONS_TYPES, SET_POKEMONS_SUBTYPES } from '../../store/ACTION_TYPES';

function CategoriesPage({ dispatch, pokemonApiUrl, setTypesValue }) {

  const { pokemons, types, subtypes, isLoading, typesValue, subtypesValue } = (useContext(StateContext));

  useEffect(() => {
    async function fetchTypes() {
      const typesResponse = await fetch(`${pokemonApiUrl}types`)
      const { types } = await typesResponse.json();  
      dispatch({ type: SET_POKEMONS_TYPES, payload: types });
    
      const subtypesResponse = await fetch(`${pokemonApiUrl}subtypes`)
      const { subtypes } = await subtypesResponse.json();
      dispatch({ type: SET_POKEMONS_SUBTYPES, payload: subtypes });
    }
    fetchTypes();
  }, [dispatch, pokemonApiUrl]);
  
  return (
    <ContentLayout>
      <div className={style.categories}>
        <div className={style.header}>
          <Header />
        </div>
        <aside className={style.aside}>
          <div className={style.asideRow}>
            <Select name="Type" list={types} setTypesValue={setTypesValue} value={typesValue} />
          </div>
          <div className={style.asideRow}>
            <Select name="Subtype" list={subtypes} setTypesValue={setTypesValue} value={subtypesValue} />
          </div>
        </aside>
        <div className={style.contentWrapper}>
          {
            isLoading
            ? <Loader />
            : pokemons.length
              ? <section className={style.content}>
                {pokemons.map(({ id, imageUrl, name, artist }, index) => (
                    <Pokemon 
                      key={id + index} 
                      image={imageUrl} 
                      name={name} 
                      artist={artist} 
                    />
                  ))}
              </section>
              : <HelpMessage>Покемона с таким сочетанием типа и подтипа нет</HelpMessage>
          }
        </div>
      </div>
    </ContentLayout>
  );
}

export default CategoriesPage; 