import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import SiteLink from '../SiteLink/SiteLink';

import twitter from '../../assets/images/icons/social-footer-1twitter-30x44.svg';
import linkedin from '../../assets/images/icons/social-footer-2linkedin-30x44.svg';
import facebook from '../../assets/images/icons/social-footer-3facebook-30x44.svg';
import instagram from '../../assets/images/icons/social-footer-4instagram-30x44.svg';
import github from '../../assets/images/icons/social-footer-5github-30x44.svg';
import email from '../../assets/images/icons/social-footer-6email-30x44.svg';

import * as FooterStyles from './Footer.module.scss';
import { SnowplowTrackingAnchor } from '../SnowplowTrackingLink/SnowplowTrackingLink';

const Footer = () => {
  const { footerContent } = useStaticQuery(graphql`
    query {
      footerContent: contentfulFooter(id: { eq: "28766a92-e081-5d30-b50c-c91be4465ba4" }) {
        socialMediaLinks {
          id
          url
          text
          isUrlRelativePath
          openInNewTab
          useSnowplowTracking
        }
        navigationLinks {
          id
          url
          text
          isUrlRelativePath
          openInNewTab
          useSnowplowTracking
        }
        legalContent {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  `);

  const dateYear = new Date().getFullYear();

  const regex = /{currentYear}/g;
  const legalContentWithCurrentYear = footerContent.legalContent.childMarkdownRemark.html.replace(
    regex,
    dateYear
  );

  const socialIcons = {
    twitter,
    linkedin,
    facebook,
    instagram,
    github,
    email
  };

  return (
    <footer className={FooterStyles.footer}>
      <div className="inner-wrapper">
        <ul className={FooterStyles.socialLinks}>
          {footerContent.socialMediaLinks.map((link) => (
            <li key={link.id}>
              {link.isUrlRelativePath ? (
                <SiteLink to={link.url}>{socialIcons[link.text.toLowerCase()]}</SiteLink>
              ) : (
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <img src={socialIcons[link.text.toLowerCase()]} alt={`Juno's ${link.text}`} />
                </a>
              )}
            </li>
          ))}
        </ul>

        <ul className={FooterStyles.infoLinks}>
          {footerContent.navigationLinks.map((link, index) => (
            <li key={link.id}>
              {link.isUrlRelativePath ? (
                <SiteLink to={link.url} id={`footer-link-${index + 1}`}>
                  {link.text}
                </SiteLink>
              ) : (
                <SnowplowTrackingAnchor
                  href={link.url}
                  target="_blank"
                  rel="noopener
                    noreferrer"
                  id={`footer-link-${index + 1}`}
                >
                  {link.text}
                </SnowplowTrackingAnchor>
              )}
            </li>
          ))}
        </ul>

        <div
          className={FooterStyles.closing}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: legalContentWithCurrentYear
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
