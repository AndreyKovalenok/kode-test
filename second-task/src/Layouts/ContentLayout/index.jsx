import React from 'react';

import style from './style.module.scss';

function ContentLayout({ children }) {
  return (
    <div className={style.contentLayout}>{children}</div>
  );
}

export default ContentLayout;