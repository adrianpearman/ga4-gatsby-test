import React from 'react';
import { graphql } from 'gatsby';
import SiteLink from '../components/SiteLink/SiteLink';

import Head from '../components/Head/Head';
import Layout from '../components/Layout/Layout';
import CarouselArrow from '../components/SVG/CarouselArrow';
import CircleHeadshot from '../components/CircleHeadshot/CircleHeadshot';

import * as EmployeeStyles from './employee-bio.module.scss';

import email from '../assets/images/employee-bio/social-team-email-20x28-evergreen.svg';
import website from '../assets/images/employee-bio/social-team-website-20x28-evergreen.svg';
import twitter from '../assets/images/employee-bio/social-team-twitter-20x28-evergreen.svg';
import linkedin from '../assets/images/employee-bio/social-team-linkedin-20x28-evergreen.svg';
import github from '../assets/images/employee-bio/social-team-github-20x28-evergreen.svg';

const Employee = ({ data, location }) => {
  const employee = data.pageContent;

  const metaContent = {
    title: employee.name,
    description: employee.bio.childMarkdownRemark.excerpt
  };

  return (
    <Layout>
      <Head metaContent={metaContent} pagePath={location.pathname} />
      <section className={`${EmployeeStyles.employee} grid-wrapper`}>
        <div className={EmployeeStyles.linkContainer}>
          <SiteLink className={EmployeeStyles.teamLink} to="/company/">
            <CarouselArrow direction="previous" type="secondary" transparentBackground />
            Meet the Team
          </SiteLink>
        </div>

        <div className={EmployeeStyles.header}>
          {employee.headshot && (
            <CircleHeadshot
              imageData={employee.headshot.gatsbyImageData}
              altText={employee.name}
              size="200px"
              className={EmployeeStyles.headshot}
            />
          )}
          <h1 className={EmployeeStyles.name}>{employee.name}</h1>
          {employee.jobCurrent && (
            <p className={EmployeeStyles.jobTitle}>
              {employee.jobCurrent}
              {employee.jobCurrentCompany && (
                <>
                  {' '}
                  at{' '}
                  {employee.jobCurrentCompanyLink ? (
                    <a
                      href={employee.jobCurrentCompanyLink}
                      className={`${EmployeeStyles.jobTitle} ${EmployeeStyles.currentCompany}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {employee.jobCurrentCompany}
                    </a>
                  ) : (
                    <>{employee.jobCurrentCompany}</>
                  )}
                </>
              )}
            </p>
          )}
          {employee.pronouns && <p className={EmployeeStyles.pronouns}>{employee.pronouns}</p>}
          <ul className={EmployeeStyles.socialLinksHeader}>
            {employee.email && (
              <li>
                <a
                  href={`mailto:${employee.email}`}
                  className={EmployeeStyles.socialLinks}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={email} alt="" />
                </a>
              </li>
            )}
            {employee.website && (
              <li>
                <a
                  href={employee.website}
                  className={EmployeeStyles.socialLinks}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={website} alt="" />
                </a>
              </li>
            )}
            {employee.twitter && (
              <li>
                <a
                  href={`https://twitter.com/${employee.twitter}`}
                  className={EmployeeStyles.socialLinks}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={twitter} alt="" />
                </a>
              </li>
            )}
            {employee.linkedin && (
              <li>
                <a
                  href={employee.linkedin}
                  className={EmployeeStyles.socialLinks}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={linkedin} alt="" />
                </a>
              </li>
            )}
            {employee.github && (
              <li>
                <a
                  href={`https://github.com/${employee.github}`}
                  className={EmployeeStyles.socialLinks}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={github} alt="" />
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className={EmployeeStyles.content}>
          <aside>
            <ul>
              {employee.email && (
                <li>
                  <a
                    href={`mailto:${employee.email}`}
                    className={EmployeeStyles.socialLinks}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={email} alt="" />
                    Email
                  </a>
                </li>
              )}
              {employee.website && (
                <li>
                  <a
                    href={employee.website}
                    className={EmployeeStyles.socialLinks}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={website} alt="" />
                    Website
                  </a>
                </li>
              )}
              {employee.twitter && (
                <li>
                  <a
                    href={`https://twitter.com/${employee.twitter}`}
                    className={EmployeeStyles.socialLinks}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={twitter} alt="" />
                    Twitter
                  </a>
                </li>
              )}
              {employee.linkedin && (
                <li>
                  <a
                    href={employee.linkedin}
                    className={EmployeeStyles.socialLinks}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={linkedin} alt="" />
                    LinkedIn
                  </a>
                </li>
              )}
              {employee.github && (
                <li>
                  <a
                    href={`https://github.com/${employee.github}`}
                    className={EmployeeStyles.socialLinks}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={github} alt="" />
                    GitHub
                  </a>
                </li>
              )}
            </ul>
          </aside>
          <div
            className={EmployeeStyles.bio}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: employee.bio.childMarkdownRemark.html
            }}
          />
        </div>
      </section>
    </Layout>
  );
};

export default Employee;

export const query = graphql`
  query ($id: String!) {
    pageContent: contentfulPerson(id: { eq: $id }) {
      id
      name
      jobCurrent
      pronouns
      bio {
        childMarkdownRemark {
          excerpt(pruneLength: 150)
          html
        }
      }
      email
      website
      twitter
      linkedin
      github
      headshot {
        id
        gatsbyImageData(width: 250, layout: CONSTRAINED)
      }
    }
  }
`;
