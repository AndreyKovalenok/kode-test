import React, { useContext, useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { StateContext, pokemonApiUrl } from '../../store/StateContext';
import useOnClickOutside from '../../customHooks/useOnClickOutside';

import style from './style.module.scss';

import ContentLayout from '../../Layouts/ContentLayout';
import Header from '../../components/Header';
import Select from '../../components/UI/Select';
import Loader from '../../components/UI/Loader';
import Pokemon from './Pokemon';
import HelpMessage from './HelpMessage';
import Pagination from './Pagination';
import ModalLayout from '../../Layouts/ModalLayout';

import { 
  SET_POKEMONS_TYPES, 
  SET_POKEMONS_SUBTYPES, 
  SET_POKEMON, 
  SET_TYPES_VALUE,
  SET_SUBTYPES_VALUE,
  SET_PAGE,
} from '../../store/ACTION_TYPES';

function CategoriesPage() {
  const [isModalOpen, toggleModal] = useState(false);
  const [{ pokemons, pokemon, types, subtypes, isLoading, typesValue, subtypesValue, lastPage }, dispatch]= useContext(StateContext);
   
  /**
   * Фунция установки значений типа и подтипа покемонов
   * @param {String} filter - тип селекта
   * @param {String} value - тип / подтип покемона
   */
  function setTypesValue({ filter, value }) {
    dispatch({ type: SET_PAGE, payload: '1' });
    if (filter === 'Type') {
      dispatch({ type: SET_TYPES_VALUE, payload: value });
    } else if (filter === 'Subtype') {
      dispatch({ type: SET_SUBTYPES_VALUE, payload: value });
    }
  }

  /**
   * Фунция очистки значений типа и подтипа покемонов
   * @param {String} filter - тип селекта
   */
  function clearTypesValue(filter) {
    dispatch({ type: SET_PAGE, payload: '1' });
    if (filter === 'Type') {
      dispatch({ type: SET_TYPES_VALUE, payload: '' });
    } else if (filter === 'Subtype') {
      dispatch({ type: SET_SUBTYPES_VALUE, payload: '' });
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
    document.body.style = 'overflow: hidden';
    const pokemon = pokemons.find(({ id }) => id === pokemonId);
    dispatch({ type: SET_POKEMON, payload: pokemon });
    toggleModal(true);
  }

  const closeModal = () => {
    toggleModal(false);
    document.body.removeAttribute('style');
  };

  const linkClickHandler = () => {
    window.scroll(0, 0);
    document.body.removeAttribute('style');
  };

  const ref = useRef();
  useOnClickOutside(ref, () => closeModal());
  
  return (
    <>
      {isModalOpen && <ModalLayout>
        <div ref={ref} className={style.pokemonModal}>
          <button className={style.pokemonModalClose} type="button" onClick={() => closeModal()}></button>
          {pokemon && <div className={style.modalContent}>
            <img src={pokemon.imageUrlHiRes} alt={pokemon.name} className={style.modalImage}/> 
            <div>
              <ul className={style.modalParams}>
                <li className={style.modalParamsItem}>Name: {pokemon.name}</li>
                <li className={style.modalParamsItem}>Rarity: {pokemon.rarity}</li>
                <li className={style.modalParamsItem}>Artist: {pokemon.artist}</li>
                {pokemon.evolvesFrom && <li className={style.modalParamsItem}>EvolvesFrom: {pokemon.evolvesFrom}</li>}
              </ul>
              <NavLink to="/card-page" onClick={() => linkClickHandler()} className={style.detailsButton}>More details</NavLink>
            </div>
          </div>}
        </div>
      </ModalLayout>}
      <ContentLayout>
        <div className={style.categories}>
          <div className={style.header}>
            <Header />
          </div>
          <aside className={style.aside}>
            <div className={style.asideRow}>
              <Select name="Type" list={types} setTypesValue={setTypesValue} clearTypesValue={clearTypesValue} value={typesValue} />
            </div>
            <div className={style.asideRow}>
              <Select name="Subtype" list={subtypes} setTypesValue={setTypesValue} clearTypesValue={clearTypesValue} value={subtypesValue} />
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
                    {Number(lastPage) > 1 && <Pagination />}
                  </>
                : <HelpMessage>Покемона с таким сочетанием типа и подтипа нет</HelpMessage>
            }
          </div>
        </div>
      </ContentLayout>
    </>
  );
}

export default CategoriesPage; 