import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import slug from "slug"

import "./country-box.scss"

class CountryBox extends Component {
  render() {
    const { country } = this.props

    return (
      <div className="col col--12 col__md--6 col__lg--3">
        <Link to={`/country/${slug(country.name, { lower: true })}`}>
          <div className="country-box">
            <div className="country-flag">
              <div
                style={{
                  backgroundImage: `url(${country.flag})`,
                }}
              />
            </div>
            <div className="country-info">
              <h1 className="country-info-name">{country.name}</h1>
              <p className="country-info-infos">
                <strong>Population: </strong>
                {country.population.toLocaleString()}
              </p>
              <p className="country-info-infos">
                <strong>Region: </strong>
                {country.region}
              </p>
              <p className="country-info-infos">
                <strong>Capital: </strong>
                {country.capital}
              </p>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

CountryBox.propTypes = {
  country: PropTypes.object.isRequired,
}

export default CountryBox
