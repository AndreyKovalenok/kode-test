import React, { useContext, useState, useEffect } from 'react';

import style from './style.module.scss';

import { StateContext } from '../../../store/StateContext';
import { SET_PAGE } from '../../../store/ACTION_TYPES';

function Pagination() {
  const [{ page, lastPage }, dispatch] = useContext(StateContext);
  const [pages, setPages] = useState([]);
  const pageToNumber = Number(page);

  useEffect(() => {
    if (pageToNumber <=3) {
      setPages(['1', '2', '3', '4', '5']);
    } else if (pageToNumber > lastPage - 3) {
      setPages([String(lastPage - 4), String(lastPage - 3), String(lastPage - 2), String(lastPage - 1), lastPage]);
    } else {
      setPages([String(page - 2), String(page - 1), page, String(pageToNumber + 1), String(pageToNumber + 2)]);
    }
  }, [page, pageToNumber, lastPage]);

  const buttonClickHandler = (el) => {
    dispatch({ type: SET_PAGE, payload: el });
  };

  return (
    <ul className={style.pagination}>
      {pageToNumber !== 1 && <li className={style.paginationItem}>
        <button onClick={() => buttonClickHandler('1')} className={style.button} type="button">First</button>
      </li>}
      {pages.map((el) => {
        const classValue = el === page ? style.activebutton : style.button;
        return (
          <li key={el} className={style.paginationItem}>
            <button onClick={() => buttonClickHandler(el)} className={classValue} type="button">{el}</button>
          </li>
        );
      })}
      {pageToNumber !== Number(lastPage) && <li className={style.paginationItem}>
        <button onClick={() => buttonClickHandler(String(lastPage))} className={style.button} type="button">Last</button>
      </li>}
    </ul>
  );
}

export default Pagination;