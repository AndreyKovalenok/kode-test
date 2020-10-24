import React, { useContext, useEffect, useCallback } from 'react';
import { StateContext } from '../../App';

import style from './style.module.scss';

import ContentLayout from '../../Layouts/ContentLayout';
import Header from '../../components/Header';
import Select from '../../components/UI/Select';
import Loader from '../../components/UI/Loader';
import Pokemon from './Pokemon';
import HelpMessage from './HelpMessage';

function CategoriesPage({ fetchTypes, setTypesValue }) {

  const { pokemons, types, subtypes, isLoading } = (useContext(StateContext));

  const memoFetchTypes = useCallback(() => {
    fetchTypes();  
  }, [fetchTypes]);

  useEffect(() => {
    memoFetchTypes();
  }, []);
  
  return (
    <ContentLayout>
      <div className={style.categories}>
        <div className={style.header}>
          <Header />
        </div>
        <aside className={style.aside}>
          <div className={style.asideRow}>
            <Select name="Type" list={types} setTypesValue={setTypesValue} />
          </div>
          <div className={style.asideRow}>
            <Select name="Subtype" list={subtypes} setTypesValue={setTypesValue} />
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