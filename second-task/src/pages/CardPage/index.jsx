import React, { useContext, useEffect } from 'react';
import { StateContext } from '../../App';
import { useHistory } from 'react-router-dom';

import style from './style.module.scss';

import ContentLayout from '../../Layouts/ContentLayout';
import Header from '../../components/Header';

function CardPage() {
  const { pokemon } = useContext(StateContext);
  const history = useHistory();
  console.log(history);
  useEffect(() => {
    if (!pokemon) {
      history.push('/');
    }
  }, [pokemon, history]);

  return (
    <ContentLayout>
      {pokemon && <div className={style.card}>
        <div className={style.headerWrapper}>
          <Header />
        </div>
        <div className={style.content}>
          <div className={style.contentRow}>
            <img className={style.image} src={pokemon.imageUrlHiRes} alt={pokemon.name}/>
            <div className={style.params}>
              <ul className={style.mainParams}>
                <li className={style.paramsItem}>Pokemon name: {pokemon.name}</li>
                {pokemon.types && <li className={style.paramsItem}>Type: {pokemon.types.join(' ')}</li>}
                <li className={style.paramsItem}>SubType: {pokemon.subtype}</li>
              </ul>  
              <ul className={style.secondaryParams}>
                {pokemon.attacks && <li className={style.paramsItem}>attackDamage: {pokemon.attacks.map((el) => el.damage).join(', ')}</li>}
                {pokemon.attacks && <li className={style.paramsItem}>attackCost: {pokemon.attacks.map((el) => el.cost.join(', ')).join(', ')}</li>}
                {pokemon.resistances && <li className={style.paramsItem}>resistances: {pokemon.resistances.map((el) => el.type).join(', ')}</li>}
                {pokemon.evolvesFrom && <li className={style.paramsItem}>evolvesFrom: {pokemon.evolvesFrom}</li>}
              </ul>
            </div>
          </div>
          {pokemon.attacks && <div className={style.description}>{pokemon.attacks.map((el) => el.text).join(' ')}</div>}
        </div>
      </div>}
    </ContentLayout>
  );
}

export default CardPage;