import React, { useContext, useState, useEffect } from 'react';

import style from './style.module.scss';

import { StateContext } from '../../../store/StateContext';
import { SET_PAGE } from '../../../store/ACTION_TYPES';

function Pagination() {
  const [{ page }, dispatch] = useContext(StateContext);
  const [pages, setPages] = useState([]);
  const pageToNumber = Number(page);

  useEffect(() => {
    if (pageToNumber === 1) {
      setPages(['1', '2', '3']);
    } else {
      setPages([String(page - 1), page, String(pageToNumber + 1)]);
    }
  }, [page, pageToNumber]);

  const buttonClickHandler = (el) => {
    dispatch({ type: SET_PAGE, payload: el });
  };

  return (
    <ul className={style.pagination}>
      {pageToNumber !== 1 && <li className={style.paginationItem}>
        <button onClick={() => buttonClickHandler(String(pageToNumber - 1))} className={style.button} type="button">Prev</button>
      </li>}
      {pages.map((el) => {
        const classValue = el === page ? style.activebutton : style.button;
        return (
          <li key={el} className={style.paginationItem}>
            <button onClick={() => buttonClickHandler(el)} className={classValue} type="button">{el}</button>
          </li>
        );
      })}
      <li className={style.paginationItem}>
        <button onClick={() => buttonClickHandler(String(pageToNumber + 1))} className={style.button} type="button">Next</button>
      </li>
    </ul>
  );
}

export default Pagination;