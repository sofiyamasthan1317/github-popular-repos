import './index.css'

const RepositoryItem = props => {
  const {repositoryItemDetails} = props
  const {
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = repositoryItemDetails

  return (
    <li className="item-list-container">
      <img className="avatar" src={avatarUrl} alt={name} />
      <h1 className="name">{name}</h1>
      <div className="count-container">
        <img
          className="icon"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="count">{starsCount}</p>
      </div>
      <div className="count-container">
        <img
          className="icon"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="count">{forksCount}</p>
      </div>
      <div className="count-container">
        <img
          className="icon"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="count">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
