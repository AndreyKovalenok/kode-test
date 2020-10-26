import React from 'react';
import style from './style.module.scss';

function Pokemon({ id, image, name, artist, setPokemonPreview }) {

  return (
    <article onClick={() => setPokemonPreview(id)} className={style.pokemon}>
      <img className={style.image} src={image} alt={name}/>
      <p className={style.name}>{name}</p>
      <p className={style.artist}>{artist}</p>
    </article>
  );
}

export default Pokemon;