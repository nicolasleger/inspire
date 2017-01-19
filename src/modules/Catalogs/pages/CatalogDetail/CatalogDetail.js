import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import { browserHistory } from 'react-router'

// Import Helpers
import { fetchCatalog, fetchMetrics } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'

// Import Shared Components
import SearchInput from '../../../../components/SearchInput/SearchInput'
import ContentLoader from '../../../../components/Loader/ContentLoader'

// Import Components
import CatalogSection from '../../components/CatalogSection/CatalogSection'
import StatisticsSection from '../../components/StatisticsSection/StatisticsSection'
import OrganizationsSection from '../../components/OrganizationsSection/OrganizationsSection'
import HarvestsSection from '../../components/HarvestsSection/HarvestsSection'

// Import CSS
import { section, sectionNoPadding, container, loader} from './CatalogDetail.css'

class CatalogDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentWillMount() {
    return Promise.all([
      this.updateCatalog(),
      this.updateMetrics(),
    ])
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  updateMetrics() {
    return waitForDataAndSetState(fetchMetrics(this.props.params.catalogId), this, 'metrics')
  }

  updateCatalog() {
    return waitForDataAndSetState(fetchCatalog(this.props.params.catalogId), this, 'catalog')
  }

  userSearch(path, textInput) {
    browserHistory.push({ pathname: '/datasets', query: {q: textInput, catalog: this.state.catalog.name} })
  }

  render() {
    const { catalog, metrics } = this.state

    if (!catalog || !metrics) return <div className={loader}><ContentLoader /></div>

    return (
      <DocumentTitle title={catalog.name}>
        <div className={container}>
          <div className={sectionNoPadding}>
            <CatalogSection catalog={catalog} />
            <StatisticsSection metrics={metrics} />
          </div>

          <div className={section}><OrganizationsSection metrics={metrics} catalog={catalog}/></div>
          <div className={section}><HarvestsSection catalog={catalog} /></div>

          <div className={section}>
            <h2>Rechercher dans les jeux de données du catalogue</h2>
            <SearchInput ref="searchInput" onSearch={(textInput) => this.userSearch('datasets', textInput)} searchButton={true}/>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

export default CatalogDetail