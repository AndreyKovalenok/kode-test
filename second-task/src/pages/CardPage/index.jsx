import React from 'react';

import style from './style.module.scss';

import ContentLayout from '../../Layouts/ContentLayout';
import Header from '../../components/Header';

function CardPage() {
  return (
    <ContentLayout>
      <div className={style.card}>
        <div className={style.headerWrapper}>
          <Header />
        </div>
        <div className={style.content}>
          <div className={style.contentRow}>
            <img className={style.image} src="https://images.pokemontcg.io/xy7/10_hires.png" alt=""/>
            <div className={style.params}>
              <ul className={style.mainParams}>
                <li className={style.paramsItem}>Pokemon name</li>
                <li className={style.paramsItem}>Type</li>
                <li className={style.paramsItem}>SubType</li>
              </ul>  
              <ul className={style.secondaryParams}>
                <li className={style.paramsItem}>attackDamage</li>
                <li className={style.paramsItem}>attackCost</li>
                <li className={style.paramsItem}>resistances</li>
                <li className={style.paramsItem}>evolvesFrom</li>
              </ul>
            </div>
          </div>
          <div className={style.description}>Does 30 damage plus 20 more damage for each Energy attached to Dark Blastoise but not used to pay for this attack. You can't add more than 40 damage in this way.</div>
        </div>
      </div>
    </ContentLayout>
  );
}

export default CardPage;