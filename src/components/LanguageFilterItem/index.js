import './index.css'

const LanguageFilterItem = props => {
  const {languageFilterItems, isActive, setActiveFilterItem} = props
  const {id, language} = languageFilterItems
  const activeItem = isActive ? 'active-btn' : 'item-btn'
  const onClickItem = () => {
    setActiveFilterItem(id)
  }
  return (
    <li className="filter-item">
      <button type="button" className={activeItem} onClick={onClickItem}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
