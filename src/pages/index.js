import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import "../styles/countries.scss"
import SEO from "../components/seo"

class IndexPage extends React.Component {
  state = {
    filter: "",
    filtered: [],
  }

  searchQuery = term => {
    this.setState({ filter: term })
    let currentList = []
    let newList = []

    if (term !== "") {
      currentList = this.props.data.allCountries.edges

      newList = currentList.filter(country => {
        const lc = country.node.name.toLowerCase()
        const filter = term.toLowerCase()

        return lc.includes(filter)
      })
    } else {
      newList = this.props.data.allCountries.edges
    }

    this.setState({
      filtered: newList,
    })
  }

  resetSearch = () => {
    this.setState({
      filter: "",
      filtered: this.props.data.allCountries.edges,
    })
  }

  componentDidMount() {
    this.setState({
      filtered: this.props.data.allCountries.edges,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.data.allCountries.edges,
    })
  }

  render() {
    return (
      <Layout>
        <SEO
          title="Home"
          keywords={[
            `gatsby`,
            `countries`,
            `frontendmentor`,
            `rest-api`,
            `react`,
          ]}
        />
        <section className="countries">
          <div className="container">
            <div className="flex">
              <div className="col--12">
                <div className="countries-filters">
                  <div className="flex flex--between">
                    <div className="col col--12 col__lg--5">
                      <div className="search-wrapper">
                        <input
                          name="search"
                          type="text"
                          value={this.state.filter}
                          placeholder="Search for a country..."
                          className="search-input"
                          onChange={e => this.searchQuery(e.target.value)}
                        />
                        <button
                          type="submit"
                          title="Submit your search query."
                          className="search-submit"
                        >
                          <svg role="img" width="1em" height="1em">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              id="sbx-icon-search-13"
                              viewBox="0 0 40 40"
                              width="100%"
                              height="100%"
                            >
                              <path
                                d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"
                                fillRule="evenodd"
                              />
                            </svg>
                          </svg>
                        </button>
                        {this.state.filter && (
                          <button
                            type="reset"
                            title="Clear the search query."
                            className="search-reset"
                            onClick={this.resetSearch}
                          >
                            <svg role="img" width="1em" height="1em">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                id="sbx-icon-clear-3"
                                viewBox="0 0 20 20"
                                width="100%"
                                height="100%"
                              >
                                <path
                                  d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"
                                  fillRule="evenodd"
                                />
                              </svg>
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="col col--6 col__lg--2">
                      <div className="select-region">
                        <span className="cs-placeholder">Filter by region</span>
                        <div className="cs-options">
                          <ul>
                            <li
                              data-option
                              data-value="africa"
                              className="cs-selected"
                            >
                              <span>Africa</span>
                            </li>
                            <li data-option data-value="america">
                              <span>America</span>
                            </li>
                            <li data-option data-value="asia">
                              <span>Asia</span>
                            </li>
                            <li data-option data-value="europe">
                              <span>Europe</span>
                            </li>
                            <li data-option data-value="oceania">
                              <span>Oceania</span>
                            </li>
                          </ul>
                        </div>
                        <select name="region">
                          <option value="" disabled>
                            Filter by Region
                          </option>
                          <option value="africa">Africa</option>
                          <option value="america">America</option>
                          <option value="asia">Asia</option>
                          <option value="europe">Europe</option>
                          <option value="oceania">Oceania</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="countries-list">
                  <div className="flex">
                    {this.state.filtered.map((country, i) => {
                      const { node } = country
                      return (
                        <div
                          key={i}
                          className="col col--12 col__md--6 col__lg--3"
                        >
                          <Link
                            to={`/country/${node.alpha3Code.toLowerCase()}`}
                          >
                            <div className="country-box">
                              <div className="country-flag">
                                <div
                                  style={{
                                    backgroundImage: `url(${node.flag})`,
                                  }}
                                />
                              </div>
                              <div className="country-info">
                                <h1 className="country-info-name">
                                  {node.name}
                                </h1>
                                <p className="country-info-infos">
                                  <strong>Population: </strong>
                                  {node.population.toLocaleString()}
                                </p>
                                <p className="country-info-infos">
                                  <strong>Region: </strong>
                                  {node.region}
                                </p>
                                <p className="country-info-infos">
                                  <strong>Capital: </strong>
                                  {node.capital}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      )
                    })}
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
  {
    allCountries {
      edges {
        node {
          name
          population
          region
          capital
          flag
          alpha3Code
        }
      }
    }
  }
`

export default IndexPage
