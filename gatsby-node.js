exports.createPages = ({ graphql, actions }) => {
  const path = require("path")
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allCountries {
          edges {
            node {
              alpha3Code
            }
          }
        }
      }
    `).then(result => {
      result.data.allCountries.edges.forEach(({ node }) => {
        createPage({
          path: `country/${node.alpha3Code.toLowerCase()}`,
          component: path.resolve(`./src/templates/countryDetail.js`),
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
