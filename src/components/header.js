import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import "../styles/header.scss"

const changeDarKMode = () => {
  if (document.documentElement.getAttribute("data-theme") === "dark") {
    document.documentElement.setAttribute("data-theme", "")
    localStorage.setItem("theme", "")
  } else {
    document.documentElement.setAttribute("data-theme", "dark")
    localStorage.setItem("theme", "dark")
  }
}

const Header = ({ siteTitle }) => (
  <div className="header">
    <header>
      <div className="container">
        <div className="flex flex--between">
          <div className="col" style={{ alignSelf: "center" }}>
            <Link to="/" className="logo">
              {siteTitle}
            </Link>
          </div>
          <div className="col">
            <button className="dark-mode-btn" onClick={() => changeDarKMode()}>
              Dark Mode
            </button>
          </div>
        </div>
      </div>
    </header>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
