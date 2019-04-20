import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import { MdKeyboardBackspace } from "react-icons/md"
import slug from "slug"
import _ from "lodash"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/country-detail.scss"

export default class countryDetail extends Component {
  borderName = code => {
    return _.find(this.props.data.countries.edges, country => {
      return country.node.alpha3Code === code
    })
  }

  render() {
    const country = this.props.data.country.edges[0]

    return (
      <Layout>
        <SEO
          title={country.node.name}
          keywords={[
            `gatsby`,
            `countries`,
            `frontendmentor`,
            `rest-api`,
            `react`,
            `${country.node.name}`,
          ]}
        />
        <section className="country-details">
          <div className="container">
            <div className="flex">
              <div className="col--12">
                <div className="flex flex--middle">
                  <div className="col col--12">
                    <div className="btn-back-action">
                      <Link to="/" className="btn">
                        <MdKeyboardBackspace />
                        <span>Back</span>
                      </Link>
                    </div>
                  </div>
                  <div className="col col__lg--6">
                    <div className="country-flag">
                      <img src={country.node.flag} alt={country.node.name} />
                    </div>
                  </div>
                  <div className="col col__lg--6">
                    <h1 className="country-name">{country.node.name}</h1>
                    <div className="flex">
                      <div className="col--12 col__md--6 col__lg--6">
                        <div className="country-info">
                          <p className="country-info-infos">
                            <strong>Native Name: </strong>
                            {country.node.nativeName}
                          </p>
                          <p className="country-info-infos">
                            <strong>Population: </strong>
                            {country.node.population.toLocaleString()}
                          </p>
                          <p className="country-info-infos">
                            <strong>Region: </strong>
                            {country.node.region}
                          </p>
                          <p className="country-info-infos">
                            <strong>Sub Region: </strong>
                            {country.node.subregion}
                          </p>
                          <p className="country-info-infos">
                            <strong>Capital: </strong>
                            {country.node.capital}
                          </p>
                        </div>
                      </div>
                      <div className="col--12 col__md--6 col__lg--6">
                        <div className="country-info">
                          <p className="country-info-infos">
                            <strong>Top Level Domain: </strong>
                            {country.node.topLevelDomain.join(", ")}
                          </p>
                          <p className="country-info-infos">
                            <strong>Currencies: </strong>
                            {country.node.currencies
                              .map(e => e.name)
                              .join(", ")}
                          </p>
                          <p className="country-info-infos">
                            <strong>Languages: </strong>
                            {country.node.languages.map(e => e.name).join(", ")}
                          </p>
                        </div>
                      </div>
                      {country.node.borders.length > 0 && (
                        <div className="col--12">
                          <div className="country-borders">
                            <p className="country-info-infos">
                              <strong>Border countries: </strong>
                            </p>
                            <div className="borders">
                              {country.node.borders.map((border, i) => {
                                const { node } = this.borderName(border)
                                return (
                                  <Link
                                    key={i}
                                    to={`/country/${slug(node.name, {
                                      lower: true,
                                    })}`}
                                    title={node.name}
                                  >
                                    <div className="country-border">
                                      <span>{node.name}</span>
                                    </div>
                                  </Link>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export const GatsbyQuery = graphql`
  query countryDetails($countryId: String!) {
    country: allCountries(filter: { alpha3Code: { eq: $countryId } }) {
      edges {
        node {
          name
          population
          region
          capital
          flag
          alpha3Code
          subregion
          nativeName
          topLevelDomain
          languages {
            name
          }
          currencies {
            name
          }
          borders
        }
      }
    }
    countries: allCountries {
      edges {
        node {
          name
          alpha3Code
        }
      }
    }
  }
`
