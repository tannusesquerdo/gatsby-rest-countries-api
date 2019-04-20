const createFilter = (term, key) => {
  return item => {
    if (term === "") {
      return true
    } else {
      term = term.toLowerCase()
      item = item.node[key].toLowerCase()

      return item.includes(term)
    }
  }
}

export { createFilter }
