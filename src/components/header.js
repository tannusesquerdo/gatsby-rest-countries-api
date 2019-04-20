import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { FaMoon, FaRegMoon } from "react-icons/fa"

import "../styles/header.scss"

class Header extends Component {
  static propTypes = {
    siteTitle: PropTypes.string,
  }

  static defaultProps = {
    siteTitle: ``,
  }

  state = {
    darkMode: false,
  }

  changeDarKMode = () => {
    if (document.documentElement.getAttribute("data-theme") === "dark") {
      document.documentElement.setAttribute("data-theme", "")
      localStorage.setItem("theme", "")
      this.setState({
        darkMode: false,
      })
    } else {
      document.documentElement.setAttribute("data-theme", "dark")
      localStorage.setItem("theme", "dark")
      this.setState({
        darkMode: true,
      })
    }
  }

  render() {
    return (
      <div className="header">
        <header>
          <div className="container">
            <div className="flex flex--between">
              <div className="col" style={{ alignSelf: "center" }}>
                <Link to="/" className="logo">
                  {this.props.siteTitle}
                </Link>
              </div>
              <div className="col">
                <button className="dark-mode-btn" onClick={this.changeDarKMode}>
                  {this.state.darkMode ? <FaMoon /> : <FaRegMoon />}
                  <span>Dark Mode</span>
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
    )
  }
}

export default Header
