import React, { useState } from 'react';
import classNames from 'classnames';

import {
  navItem,
  tabWrapper,
  navItemSelected,
  tabHeader,
} from './tab-view.module.scss';

export default function TabView({ children }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const subComponentList = Object.keys(TabView);

  const subComponents = subComponentList.map((key) => {
    return React.Children.map(children, (child) =>
      child.type.name === key ? child : null
    );
  });

  return (
    <section className={tabWrapper}>
      <header className={tabHeader}>
        <nav>
          {subComponents[0].map((item, index) => (
            <button
              className={classNames(
                navItem,
                currentIndex === index ? navItemSelected : null
              )}
              key={index}
              onClick={() => setCurrentIndex(index)}
            >
              {item.props.title}
            </button>
          ))}
        </nav>
      </header>
      <article>{subComponents[0][currentIndex].props.children}</article>
    </section>
  );
}

const TabItem = () => {
  return <div></div>;
};

TabView.TabItem = TabItem;
