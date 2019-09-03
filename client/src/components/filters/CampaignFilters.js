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
  // array of property / value pairs.
  // property represents the property the filter applies to.
  // value represents the actual filter value
  const filters = newValue.map(v => {
    const [property, value] = v.split(PROP_VAL_SEPARATOR)
    return {
      property,
      value
    }
  })
  this.props.onFilterChange(filters)

  this.setState({ value: newValue })
}

render () {
  const { locations, genres, screenTypes } = this.props
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
      <TreeNode selectable={false} value='locations-parent' title='Locations'>
        {locations.map(x =>
          <TreeNode key={x} value={`location${PROP_VAL_SEPARATOR}${x}`} title={x} />)}
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
