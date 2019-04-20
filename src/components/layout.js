/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import "../styles/pintsize.scss"
import "../styles/global.scss"
import "./layout.css"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div className="app">
        <Header siteTitle={data.site.siteMetadata.title} />
        <>{children}</>
        <footer>
          <div className="container">
            <div className="flex">
              <div className="col col--12 t-center">
                <small>
                  <p>
                    © {new Date().getFullYear()}. Challenge by{" "}
                    <a
                      href="https://beta.frontendmentor.io/?ref=challenge"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      frontend Mentor
                    </a>
                    . Coded by{` `}
                    <a
                      href="https://github.com/tannusesquerdo"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @tannusesquerdo
                    </a>
                    . Built with
                    {` `}
                    <a
                      href="https://www.gatsbyjs.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Gatsby
                    </a>
                    .
                  </p>
                </small>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
