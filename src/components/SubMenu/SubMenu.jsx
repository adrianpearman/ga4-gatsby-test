import React, { useEffect, useState } from 'react';
import SiteLink from '../SiteLink/SiteLink';

import * as SubMenuStyles from './SubMenu.module.scss';
import CarouselArrow from '../SVG/CarouselArrow';
import Chevron from '../SVG/Chevron';

const SubMenu = ({ menuInfo, openedSubMenu, mobileMenuOpened, handleLinkClick }) => {
  const hasProducts = !!menuInfo.productList;
  let productsOrderedByTopicMap;
  if (hasProducts) {
    productsOrderedByTopicMap = menuInfo.productList.reduce(
      (map, item) => map.set(item.topic, [...(map.get(item.topic) || []), item]),
      new Map()
    );
  }

  let subMenuClassName = menuInfo.parentHeading.toLowerCase();
  if (subMenuClassName === 'for companies') {
    subMenuClassName = 'forCompanies';
  }

  const [openedInnerSubMenu, setOpenedInnerSubMenu] = useState('');

  useEffect(() => {
    if (!mobileMenuOpened) {
      setOpenedInnerSubMenu('');
    }
    if (openedSubMenu !== menuInfo.parentHeading) {
      setOpenedInnerSubMenu('');
    }
  }, [mobileMenuOpened, openedSubMenu, menuInfo]);

  const handleHeadingButtonClick = (headingText) => {
    setOpenedInnerSubMenu(headingText);
    if (openedInnerSubMenu === headingText) {
      setOpenedInnerSubMenu('');
    }
  };

  return (
    <div
      className={`${SubMenuStyles.subMenu} ${SubMenuStyles[subMenuClassName]} ${
        openedSubMenu === menuInfo.parentHeading ? SubMenuStyles.showSubMenu : ''
      }`}
    >
      <div className={SubMenuStyles.leftSection}>
        <p className={SubMenuStyles.marketingSentence}>
          {menuInfo.marketingSentence.marketingSentence}
        </p>
        {menuInfo.marketingArrowLink && (
          <SiteLink
            className={SubMenuStyles.marketingLink}
            to={menuInfo.marketingArrowLink.url}
            onClick={handleLinkClick}
          >
            {menuInfo.marketingArrowLink.text}
            <CarouselArrow direction="next" type="secondary" transparentBackground />
          </SiteLink>
        )}
      </div>
      <div className={SubMenuStyles.centerSection}>
        {hasProducts ? (
          <>
            {productsOrderedByTopicMap &&
              Array.from(productsOrderedByTopicMap).map(([topic, products]) => (
                <div className={SubMenuStyles.topic} key={topic}>
                  {/* On Desktop, the topic heading is a <p>, on tablet/mobile it changes to a button to handle click functions */}
                  <p className={SubMenuStyles.heading}>{topic}</p>
                  <button
                    className={`${SubMenuStyles.heading} ${
                      openedInnerSubMenu === topic ? SubMenuStyles.clicked : ''
                    }`}
                    onClick={() => handleHeadingButtonClick(topic)}
                    type="button"
                    aria-label={`${
                      openedInnerSubMenu === topic ? 'Close' : 'Open'
                    } the ${topic} sub menu.`}
                  >
                    {topic}
                    <Chevron
                      parentStyles={`${SubMenuStyles.mobileInnerMenuToggleIcon} ${
                        openedInnerSubMenu === topic
                          ? SubMenuStyles.mobileInnerMenuToggleIconClicked
                          : ''
                      }`}
                      onClick={() => handleHeadingButtonClick(topic)}
                    />
                  </button>

                  <ul className={openedInnerSubMenu === topic ? SubMenuStyles.showSubMenu : ''}>
                    {products.map((product) => {
                      const productSlug = `/${product.type}/${product.slug}/`;
                      return (
                        <li key={product.id}>
                          <SiteLink to={productSlug} onClick={handleLinkClick}>
                            <span>{product.menuDisplayName || product.name}</span>
                          </SiteLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
          </>
        ) : (
          // if the sub menu does not have a list of products to display, it will display the general link list info instead
          <ul className={SubMenuStyles.generalLinkList}>
            {menuInfo.allPageLinks.map((pageLink) => (
              <li key={pageLink.id}>
                <SiteLink
                  to={pageLink.url}
                  id={subMenuClassName === 'forCompanies' && `${pageLink.url.slice(1)}-nav-link`}
                  onClick={handleLinkClick}
                >
                  {pageLink.text}
                </SiteLink>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* The "right-section" only renders if the sub menu has a list of products to display */}
      {hasProducts && (
        <div className={SubMenuStyles.rightSection}>
          {/* On Desktop, the "Why Juno" heading is a <p>, on tablet/mobile it changes to a button to handle click functions */}
          <p className={SubMenuStyles.heading}>Why Juno</p>
          <button
            className={`${SubMenuStyles.heading} ${
              openedInnerSubMenu === 'Why Juno' ? SubMenuStyles.clicked : ''
            }`}
            onClick={() => handleHeadingButtonClick('Why Juno')}
            type="button"
            aria-label={`${
              openedInnerSubMenu === 'Why Juno' ? 'Close' : 'Open'
            } the related links sub menu.`}
          >
            Why Juno
            <Chevron
              parentStyles={`${SubMenuStyles.mobileInnerMenuToggleIcon} ${
                openedInnerSubMenu === 'Why Juno'
                  ? SubMenuStyles.mobileInnerMenuToggleIconClicked
                  : ''
              }`}
              onClick={() => handleHeadingButtonClick('Why Juno')}
            />
          </button>

          <ul
            className={`${SubMenuStyles.generalLinkList} ${
              openedInnerSubMenu === 'Why Juno' ? SubMenuStyles.showSubMenu : ''
            }`}
          >
            {menuInfo.allPageLinks.map((pageLink) => (
              <li key={pageLink.id}>
                <SiteLink to={pageLink.url} onClick={handleLinkClick}>
                  {pageLink.text}
                </SiteLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SubMenu;
