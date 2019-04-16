import fetch from "node-fetch"
import axios from "axios"

exports.sourceNodes = (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions
  const API = `https://restcountries.eu/rest/v2`

  delete configOptions.plugins

  return new Promise((resolve, reject) => {
    // Fetch data and return items array
    axios.get(`${API}/all`).then(res => {
      res.data.forEach(country => {
        const nodeMeta = {
          id: createNodeId(`country-id-${country.numericCode}`),
          parent: null,
          children: [],
          internal: {
            type: "countries",
            content: JSON.stringify(country),
            contentDigest: createContentDigest(country),
          },
        }
        const node = Object.assign({}, country, nodeMeta)
        createNode(node)
      })
      resolve()
    })
  })
}
