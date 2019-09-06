import React from 'react'
import { Input } from 'antd'

class SearchBar extends React.Component {
  handleSearch = (e) => {
    this.props.onSearch(e.target.value)
  }

  render () {
    const { Search } = Input
    return (
      <div>
        <Search
          placeholder='Search'
          onChange={this.handleSearch}
          style={{ width: 200 }}
        />
      </div>
    )
  }
}

export default SearchBar
