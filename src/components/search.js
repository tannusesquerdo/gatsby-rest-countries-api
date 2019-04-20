import React, { Component } from "react"
import * as PropTypes from "prop-types"

import "./search.scss"

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: this.props.term || "",
    }
    this.updateSearch = this.updateSearch.bind(this)
    this.resetSearch = this.resetSearch.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps.value !== "undefined" &&
      nextProps.value !== this.props.value
    ) {
      const e = {
        target: {
          value: nextProps.value,
        },
      }
      this.updateSearch(e)
    }
  }

  updateSearch(e) {
    const searchTerm = e.target.value
    this.setState(
      {
        searchTerm: searchTerm,
      },
      () => this.props.onChange(searchTerm)
    )
  }

  resetSearch() {
    this.setState(
      {
        searchTerm: "",
      },
      () => this.props.onReset()
    )
  }

  render() {
    return (
      <div className="search-wrapper">
        <input
          name="search"
          type="search"
          value={this.state.searchTerm}
          placeholder="Search for a country..."
          className="search-input"
          onChange={this.updateSearch}
          autoComplete="off"
          aria-label="Search for a country"
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
        {this.state.searchTerm && (
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
    )
  }
}

Search.defaultProps = {
  onChange() {},
  onReset() {},
}

Search.propTypes = {
  onChange: PropTypes.func,
  onReset: PropTypes.func,
}

export default Search
