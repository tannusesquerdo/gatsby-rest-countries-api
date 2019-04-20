import React from "react"
import { graphql } from "gatsby"
import chunk from "lodash/chunk"

import Layout from "../components/layout"
import "../styles/countries.scss"
import SEO from "../components/seo"
import Search from "../components/search"
import Dropdown from "../components/dropdown"
import CountryBox from "../components/country-box"
import { createFilter } from "../components/utils"

if (typeof window !== `undefined`) window.postsToShow = 12

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    let postsToShow = 12
    if (typeof window !== `undefined`) {
      postsToShow = window.postsToShow
    }

    this.state = {
      searchTerm: ``,
      filterKey: `name`,
      filtered: [],
      showingMore: postsToShow > 12,
      postsToShow,
    }
    this.searchUpdated = this.searchUpdated.bind(this)
    this.resetSearch = this.resetSearch.bind(this)
    this.filterUpdated = this.filterUpdated.bind(this)
  }

  searchUpdated(term) {
    this.setState({ filterKey: `name`, searchTerm: term })
  }

  filterUpdated(filter) {
    this.setState({ filterKey: `region`, searchTerm: filter })
  }

  resetSearch() {
    this.setState({
      searchTerm: ``,
    })
  }

  update() {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      (window.scrollY + window.innerHeight)
    if (this.state.showingMore && distanceToBottom < 100) {
      this.setState({ postsToShow: this.state.postsToShow + 12 })
    }
    this.ticking = false
  }

  handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true
      requestAnimationFrame(() => this.update())
    }
  }

  componentDidMount() {
    window.addEventListener(`scroll`, this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll)
    window.postsToShow = this.state.postsToShow
  }

  render() {
    const currentList = this.props.data.allCountries.edges
    const filtered = currentList.filter(
      createFilter(this.state.searchTerm, this.state.filterKey)
    )

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
                      <Search
                        onChange={this.searchUpdated}
                        onReset={this.resetSearch}
                      />
                    </div>
                    <div className="col col--6 col__lg--2">
                      <Dropdown
                        placeholder="Filter by region"
                        items={[
                          { value: "Africa", id: 1 },
                          { value: "America", id: 2 },
                          { value: "Asia", id: 3 },
                          { value: "Europe", id: 4 },
                          { value: "Oceania", id: 5 },
                        ]}
                        onChange={this.filterUpdated}
                      />
                    </div>
                  </div>
                </div>
                <div className="countries-list">
                  <div className="flex">
                    {chunk(filtered.slice(0, this.state.postsToShow)).map(
                      (chunk, i) =>
                        chunk.map(node => (
                          <CountryBox key={`chunk-${i}`} country={node.node} />
                        ))
                    )}
                    <div className="col--12 load-more">
                      {!this.state.showingMore && (
                        <div
                          data-testid="load-more"
                          className="btn-load-mode"
                          onClick={() => {
                            this.setState({
                              postsToShow: this.state.postsToShow + 12,
                              showingMore: true,
                            })
                          }}
                        >
                          Load More
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
