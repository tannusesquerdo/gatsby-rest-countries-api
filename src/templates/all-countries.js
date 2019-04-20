import React from "react"
import { Link } from "gatsby"

export default ({ pageContext: { allCountries } }) => (
  <div style={{ width: 960, margin: `4rem auto` }}>
    <h1>Choose a Pokémon!</h1>
    <ul style={{ padding: 0 }}>
      {allCountries.map(pokemon => (
        <li
          key={pokemon.id}
          style={{
            textAlign: `center`,
            listStyle: `none`,
            display: `inline-block`,
          }}
        >
          <Link to={`/pokemon/${pokemon.name}`}>
            <p>{pokemon.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)
