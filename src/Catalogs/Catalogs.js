import React, { Component } from 'react'
import Catalog from '../Catalog/Catalog'

class Catalogs extends Component {
  constructor(props) {
    super(props)
    this.state = {catalogs: []}
    this.getCatalogs()
  }

  getCatalogs() {
    return fetch('https://inspire.data.gouv.fr/api/geogw/catalogs')
      .then((response) => response.json())
      .then((catalogs) => {
        this.setState({catalogs})
      })
      .catch((err) => {
        console.error(err)
      })
  }

  render() {
    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingTop: '2em',
      },
    }
    return (
      <div className="catalogs">
        <div style={styles.container}>
          {this.state.catalogs.map((catalog, idx) => <Catalog key={idx} catalog={catalog} />)}
        </div>
      </div>
    )
  }
}

export default Catalogs
