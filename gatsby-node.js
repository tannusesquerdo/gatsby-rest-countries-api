const axios = require("axios")

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

exports.createPages = ({ graphql, actions }) => {
  const path = require("path")
  const slug = require("slug")
  const slash = require("slash")
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allCountries {
          edges {
            node {
              name
              alpha3Code
            }
          }
        }
      }
    `).then(result => {
      const countryTemplate = path.resolve(`./src/templates/country-detail.js`)
      result.data.allCountries.edges.forEach(({ node }) => {
        createPage({
          path: `country/${slug(node.name, { lower: true })}`,
          component: slash(countryTemplate),
          context: {
            countryId: node.alpha3Code,
          },
        })
      })
    })
    resolve()
  }).catch(error => {
    console.log(error)
    reject()
  })
}
