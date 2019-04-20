import React, { Component } from "react"
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md"

import "./dropdown.scss"

class Dropdown extends Component {
  state = {
    ...this.props,
    items: this.props.items || [],
    selectedItem: this.props.selectedItem || "",
    showItems: false,
  }

  dropDown = () => {
    this.setState(prevState => ({
      showItems: !prevState.showItems,
    }))
  }

  selectItem = item => {
    this.setState(
      {
        selectedItem: item,
        showItems: false,
      },
      () => this.props.onChange(item.value)
    )
  }

  render() {
    return (
      <>
        <div className="select-box">
          <div className="select-box--container" onClick={this.dropDown}>
            <div className="select-box--selected-item">
              {this.state.selectedItem.value || this.state.placeholder}
            </div>
            <div className="select-box--arrow">
              {this.state.showItems ? (
                <MdKeyboardArrowUp />
              ) : (
                <MdKeyboardArrowDown />
              )}
            </div>
          </div>
          <div
            className="select-box--items"
            style={{ display: this.state.showItems ? "block" : "none" }}
          >
            {this.state.items.map(item => (
              <div
                key={item.id}
                onClick={() => this.selectItem(item)}
                className={this.state.selectedItem === item ? "selected" : ""}
              >
                {item.value}
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }
}

export default Dropdown
