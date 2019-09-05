import React from 'react'
import { Input } from 'antd'

class SearchBar extends React.Component {
  render () {
    const { Search } = Input

    return (
      <div>
        <Search
          placeholder='Search'
          onSearch={value => console.log(value)}
          style={{ width: 200 }}
        />
      </div>
    )
  }
}

export default SearchBar
