import {Component} from 'react'

import Loader from 'react-loader-spinner'

import RepositoryItem from '../RepositoryItem'

import LanguageFilterItem from '../LanguageFilterItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    repositoriesData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeLanguageId} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`,
    )
    if (response.ok) {
      const fetchedData = await response.json()
      const formattedData = fetchedData.popular_repos.map(each => ({
        id: each.id,
        name: each.name,
        issuesCount: each.issues_count,
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
      }))
      this.setState({
        repositoriesData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-page">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-msg">Something Went Wrong</h1>
    </div>
  )

  renderRepositoryItem = () => {
    const {repositoriesData} = this.state
    return (
      <ul className="item-container">
        {repositoriesData.map(each => (
          <RepositoryItem key={each.id} repositoryItemDetails={each} />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryItem()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  setActiveFilterItem = filterId => {
    this.setState(
      {
        activeLanguageId: filterId,
      },
      this.getRepositories,
    )
  }

  render() {
    const {activeLanguageId} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Popular</h1>
        <ul className="filter-item">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              isActive={each.id === activeLanguageId}
              languageFilterItems={each}
              setActiveFilterItem={this.setActiveFilterItem}
            />
          ))}
        </ul>
        {this.renderRepositories()}
      </div>
    )
  }
}

export default GithubPopularRepos
