import React from 'react';

import style from './style.module.scss';

function MainLayout({ children }) {
return <div className={style.mainLayout}>{ children }</div>
}

export default MainLayout;