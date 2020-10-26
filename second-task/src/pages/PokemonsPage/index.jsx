import React, { useContext, useEffect } from 'react';
import { StateContext, pokemonApiUrl } from '../../store/StateContext';

import style from './style.module.scss';

import ContentLayout from '../../Layouts/ContentLayout';
import Header from '../../components/Header';
import Select from '../../components/UI/Select';
import Loader from '../../components/UI/Loader';
import Pokemon from './Pokemon';
import HelpMessage from './HelpMessage';
import Pagination from './Pagination';

import { 
  SET_POKEMONS_TYPES, 
  SET_POKEMONS_SUBTYPES, 
  SET_POKEMON, 
  SET_TYPES_VALUE,
  SET_SUBTYPES_VALUE,
} from '../../store/ACTION_TYPES';

function CategoriesPage() {

  const [{ pokemons, types, subtypes, isLoading, typesValue, subtypesValue }, dispatch]= useContext(StateContext);
   
  /**
   * Фунция установки значений типа и подтипа покемонов
   * @param {String} filter - тип селекта
   * @param {String} value - тип / подтип покемона
   */
  function setTypesValue({ filter, value }) {
    if (filter === 'Type') {
      dispatch({ type: SET_TYPES_VALUE, payload: value });
    } else if (filter === 'Subtype') {
      dispatch({ type: SET_SUBTYPES_VALUE, payload: value });
    }
  }

  useEffect(() => {
    /**
     * Получение типов и подтипов для селектов
     */
    async function fetchTypes() {
      const typesResponse = await fetch(`${pokemonApiUrl}types`)
      const { types } = await typesResponse.json();  
      dispatch({ type: SET_POKEMONS_TYPES, payload: types });
    
      const subtypesResponse = await fetch(`${pokemonApiUrl}subtypes`)
      const { subtypes } = await subtypesResponse.json();
      dispatch({ type: SET_POKEMONS_SUBTYPES, payload: subtypes });
    }
    fetchTypes();
  }, [dispatch]);

  /**
   * Выбор покемона для отображения на детальной карточке
   * @param {String} pokemonId - id покемона
   */
  const setPokemonPreview = (pokemonId) => {
    const pokemon = pokemons.find(({ id }) => id === pokemonId);
    dispatch({ type: SET_POKEMON, payload: pokemon });
  }
  
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
              ? <>
                  <section className={style.content}>
                    {pokemons.map(({ id, imageUrl, name, artist }, index) => (
                        <Pokemon 
                          key={id + index} 
                          id={id}
                          image={imageUrl} 
                          name={name} 
                          artist={artist} 
                          setPokemonPreview={setPokemonPreview}
                        />
                      ))}  
                  </section>
                  <Pagination />
                </>
              : <HelpMessage>Покемона с таким сочетанием типа и подтипа нет</HelpMessage>
          }
        </div>
      </div>
    </ContentLayout>
  );
}

export default CategoriesPage; 