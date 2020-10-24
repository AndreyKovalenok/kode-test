import React from 'react';

import style from './style.module.scss';

function Pokemon() {
  return (
    <article className={style.pokemon}>
      <img className={style.image} src="https://images.pokemontcg.io/base5/20.png" alt=""/>
      <p className={style.name}>Pokemon name</p>
      <p className={style.artist}>Artist</p>
    </article>
  );
}

export default Pokemon;