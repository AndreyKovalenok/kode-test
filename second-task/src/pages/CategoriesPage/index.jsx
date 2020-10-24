import React from 'react';

import style from './style.module.scss';

import ContentLayout from '../../Layouts/ContentLayout';
import Header from '../../components/Header';
import Select from '../../components/UI/Select';
import Pokemon from './Pokemon';

function CategoriesPage() {
  const typeList = {
    title: 'Type',
    list: [
      {id: 0, text: 'Type 0'},
      {id: 1, text: 'Type 1'},
      {id: 2, text: 'Type 2'},
      {id: 3, text: 'Type 3'},
      {id: 4, text: 'Type 4'},
      {id: 5, text: 'Type 5'},
      {id: 6, text: 'Type 6'},
    ]
  };

  const subtypeList = {
    title: 'Subtype',
    list : [
      {id: 0, text: 'Subtype 0'},
      {id: 1, text: 'Subtype 1'},
      {id: 2, text: 'Subtype 2'},
      {id: 3, text: 'Subtype 3'},
      {id: 4, text: 'Subtype 4'},
      {id: 5, text: 'Subtype 5'},
      {id: 6, text: 'Subtype 6'},
    ]
  };


  return (
    <ContentLayout>
      <div className={style.categories}>
        <div className={style.header}>
          <Header />
        </div>
        <aside className={style.aside}>
          <div className={style.asideRow}>
            <Select list={typeList} />
          </div>
          <div className={style.asideRow}>
            <Select list={subtypeList} />
          </div>
        </aside>
        <section className={style.content}>
          <Pokemon />
          <Pokemon />
          <Pokemon />
          <Pokemon />
          <Pokemon />
          <Pokemon />
          <Pokemon />
          <Pokemon />
          <Pokemon />
          <Pokemon />
        </section>
      </div>
    </ContentLayout>
  );
}

export default CategoriesPage; 