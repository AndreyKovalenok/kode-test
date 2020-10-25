import React from 'react';
import { NavLink } from 'react-router-dom';

import style from './style.module.scss';

function Pokemon({ id, image, name, artist, setPokemonPreview }) {

  return (
    <article onClick={() => setPokemonPreview(id)} className={style.pokemon}>
      <NavLink className={style.link} to="/card-page">
        <img className={style.image} src={image} alt={name}/>
        <p className={style.name}>{name}</p>
        <p className={style.artist}>{artist}</p>
      </NavLink>
    </article>
  );
}

export default Pokemon;