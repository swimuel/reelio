import React from 'react'
import { TreeSelect } from 'antd'

import './filters.css'

const { TreeNode } = TreeSelect
const PROP_VAL_SEPARATOR = ':'

class CampaignFilters extends React.Component {
state = {
  value: []
}

handleFilterChange = (newValue) => {
  // object of property / value pairs.
  // property represents the property the filter applies to.
  // value represents the actual filter value(s)
  const filters = {}
  newValue.forEach(selectedValue => {
    const [property, value] = selectedValue.split(PROP_VAL_SEPARATOR)
    if (filters[property] === undefined) {
      filters[property] = [value]
    } else {
      filters[property].push(value)
    }
  })

  this.props.onFilterChange(filters)

  this.setState({ value: newValue })
}

render () {
  const { cinemas, genres, screenTypes } = this.props
  const { value } = this.state
  return <div className='campaigns-filter'>
    <TreeSelect
      showSearch
      multiple
      treeDefaultExpandAll
      allowClear
      maxTagCount={0}
      maxTagPlaceholder={`${value.length} selected`}
      value={value}
      placeholder={`Filter campaigns`}
      style={{ width: 300 }}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      onChange={this.handleFilterChange}
    >
      <TreeNode selectable={false} value='cinemas-parent' title='Cinema Names'>
        {cinemas.map(x =>
          <TreeNode key={x} value={`cinemaName${PROP_VAL_SEPARATOR}${x}`} title={x} />)}
      </TreeNode>
      <TreeNode selectable={false} value='genres-parent' title='Genres'>
        {genres.map(x =>
          <TreeNode key={x} value={`genre${PROP_VAL_SEPARATOR}${x}`} title={x} />)}
      </TreeNode>
      <TreeNode selectable={false} value='screenTypes-parent' title='Screen Types'>
        {screenTypes.map(x =>
          <TreeNode key={x} value={`screenType${PROP_VAL_SEPARATOR}${x}`} title={x} />)}
      </TreeNode>
    </TreeSelect>
  </div>
}
}

export default CampaignFilters
