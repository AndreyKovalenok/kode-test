import React, { useState } from 'react';
// import useOnClickOutside from '../../../customHooks/useOnClickOutside';

import style from './style.module.scss';

function Select({ list: { title, list } }) {
  const [isOpen, setSelectState] = useState(false);
  const [selectClasses, setSelectClasses] = useState([style.select])
  const [dropdownList, setDropdownList] = useState(list);

  const selectClickHandler = () => {
    setSelectState(!isOpen);
    if (selectClasses.indexOf(style.active) !== -1) {
      setSelectClasses(selectClasses.filter((el) => el !== style.active));
    } else {
      setSelectClasses([...selectClasses, style.active]);
    }
  };

  const filterInputChangeHandler = (evt) => {
    const filteredList = list.filter((el) => el.text.toLowerCase().includes(evt.target.value.trim().toLowerCase()));
    setDropdownList(filteredList);
  };

  // TODO клик вне элемента
  // const ref = useRef();
  // useOnClickOutside(ref, () => selectClickHandler(false))

  return (
    <div className={selectClasses.join(' ')}>
      <div 
        className={style.selectInput}
        onClick={selectClickHandler}
      >{title}</div>
      {isOpen && <div className={style.selectDropdown}>
        <input 
          type="text" 
          className={style.selectSearch} 
          placeholder="Type something..."
          onInput={filterInputChangeHandler}
        />
        <ul className={style.selectList}>
          {
            dropdownList.map(({ id, text }) => (
              <li key={id} className={style.selectItem}>{text}</li>
            ))
          }
        </ul> 
      </div>}
    </div>
  );
}

export default Select;