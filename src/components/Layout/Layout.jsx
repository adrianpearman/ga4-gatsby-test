import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql, Script } from 'gatsby';

import Header from '../Header/Header';
import HeaderWebDev from '../HeaderWebDev/HeaderWebDev';
import Footer from '../Footer/Footer';
import KonamiSurprise from '../KonamiSurprise/KonamiSurprise';
import SimpleSlideModal from '../Modals/SimpleSlideModal';

import useSnowplowDomainUserId from '../../hooks/useSnowplowDomainUserId';

import * as LayoutStyles from './Layout.module.scss';

const Layout = ({
  children,
  pageSlug,
  webDevHeader,
  scrollToAnchor,
  applyDirectlyTo,
  hideFixedNav,
  showFixedApplyNowButton
}) => {
  const { bannerQuery, popUpsQuery } = useStaticQuery(graphql`
    query {
      bannerQuery: allContentfulUpdatesBanner(filter: { showBanner: { eq: true } }, limit: 1) {
        edges {
          node {
            content {
              content
              childMarkdownRemark {
                html
              }
            }
          }
        }
      }
      popUpsQuery: allContentfulPopUp {
        edges {
          node {
            heading
            subheading
            type
            trackingId
            ctaText
            ctaLink
            visibleOnPages {
              ... on ContentfulBlogPost {
                slug
              }
              ... on ContentfulPageGeneric {
                slug
              }
            }
          }
        }
      }
    }
  `);
  const banner = bannerQuery.edges[0].node;

  const domainUserId = useSnowplowDomainUserId();

  const [pagePopUp, setPagePopUp] = useState(null);
  useEffect(() => {
    const allPopUps = popUpsQuery.edges.map((edge) => edge.node);

    if (pageSlug) {
      const [matchingPopUp] = allPopUps.filter((popUp) => {
        const { visibleOnPages } = popUp;
        const matchingPageSlug = visibleOnPages.find((page) => page.slug === pageSlug);
        return matchingPageSlug;
      });

      setPagePopUp(matchingPopUp);
    }
  }, [pageSlug, popUpsQuery]);

  const [livechatLoaded, setLivechatLoaded] = useState(false);

  // LiveChat API v2.0 https://developers.livechat.com/docs/extending-chat-widget/javascript-api
  useEffect(() => {
    if (typeof window !== 'undefined' && window && domainUserId && livechatLoaded) {
      window.LiveChatWidget.once('ready', () => {
        window.LiveChatWidget.call('update_session_variables', {
          domainUserId
        });
      });
      window.LiveChatWidget.on('form_submitted', (data) => {
        const chatData = window.LiveChatWidget.get('chat_data');
        switch (data.type) {
          case 'ticket':
            window.snowplow(
              'trackStructEvent',
              'tracking',
              'livechatTicket',
              data.ticket_id || chatData.chatId
            );
            break;
          default:
            break;
        }
      });
    }
  }, [domainUserId, livechatLoaded]);

  return (
    <>
      <Script
        key="livechat"
        type="text/javascript"
        onLoad={() => setLivechatLoaded(true)}
        dangerouslySetInnerHTML={{
          __html: `window.__lc = window.__lc || {};
            window.__lc.license = 9290795;
            ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))`
        }}
      />
      <noscript key="livechat-noscript">
        <a href="https://www.livechatinc.com/chat-with/9290795/" rel="nofollow">
          Chat with us
        </a>
        , powered by{' '}
        <a
          href="https://www.livechatinc.com/?welcome"
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          LiveChat
        </a>
      </noscript>
      <div className={LayoutStyles.wrapper}>
        <a href="#main" className={LayoutStyles.skipLink} tabIndex={0}>
          Skip to main content
        </a>

        {webDevHeader ? (
          <HeaderWebDev scrollToAnchor={scrollToAnchor} />
        ) : (
          <Header
            applyDirectlyTo={applyDirectlyTo}
            hideFixedNav={hideFixedNav}
            showFixedApplyNowButton={showFixedApplyNowButton}
          />
        )}

        {/* If the webDevHeader prop is added to <Layout>, then this banner will not be shown. */}
        {!webDevHeader && (
          <>
            {banner && (
              <div
                className={LayoutStyles.updatesBanner}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: banner.content.childMarkdownRemark.html
                }}
              />
            )}
          </>
        )}

        <main role="main" id="main">
          <KonamiSurprise
            password="queer-devs-rule"
            alternatePassword="trans-devs-rule"
            hintMessage={['🏳️‍🌈Queer Devs Rule!🏳️‍🌈', '🔵🌸⚪️Trans Devs Rule!⚪️🌸🔵']}
          />
          {pagePopUp && <SimpleSlideModal content={pagePopUp} />}
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};
export default Layout;
