import React, { useState, useEffect } from 'react';
// import useOnClickOutside from '../../../customHooks/useOnClickOutside';

import style from './style.module.scss';

function Select({ name, list, setTypesValue, value = '' }) {
  const [isOpen, setSelectState] = useState(false);
  const [selectClasses, setSelectClasses] = useState([style.select])
  const [dropdownList, setDropdownList] = useState(list);

  const setButtonClassName = (el) => {
    const className = [style.button];
    if (value === el) {
      className.push(style.activeButton);
    }
    return className.join(' ');
  }

  const selectClickHandler = () => {
    setSelectState(!isOpen);
    if (selectClasses.indexOf(style.active) !== -1) {
      setSelectClasses(selectClasses.filter((el) => el !== style.active));
    } else {
      setSelectClasses([...selectClasses, style.active]);
    }
  };

  const filterInputChangeHandler = (evt) => {
    const filteredList = list.filter((el) => el.toLowerCase().includes(evt.target.value.trim().toLowerCase()));
    setDropdownList(filteredList);
  };

  useEffect(() => {
    setDropdownList(list);
  }, [list]);

  // TODO клик вне элемента
  // const ref = useRef();
  // useOnClickOutside(ref, () => selectClickHandler(false))

  return (
    <div className={selectClasses.join(' ')}>
      <div 
        className={style.selectInput}
        onClick={selectClickHandler}
      >{value || name}</div>
      {isOpen && <div className={style.selectDropdown}>
        <input 
          type="text" 
          className={style.selectSearch} 
          placeholder="Type something..."
          onInput={filterInputChangeHandler}
        />
        <ul className={style.selectList}>
          {
            dropdownList.map((el) => (
              <li key={el} className={style.selectItem}>
                <button className={setButtonClassName(el)} onClick={() => {
                  setTypesValue({ filter: name, value: el });
                }} type="button">{el}</button>
              </li>
            ))
          }
        </ul> 
      </div>}
    </div>
  );
}

export default Select;