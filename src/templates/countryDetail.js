import React, { Component } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/country-detail.scss"

export default class countryDetail extends Component {
  render() {
    const country = this.props.data.allCountries.edges[0]
    console.log(country)
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
                        Back
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
                      <div className="col--6">
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
                      <div className="col--6">
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
                              {country.node.borders.join(", ")}
                            </p>
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
    allCountries(filter: { alpha3Code: { eq: $countryId } }) {
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
  }
`
