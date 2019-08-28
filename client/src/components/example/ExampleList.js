import React from 'react'
import Example from './Example'
import { getExamples } from '../api'

// example component that displays a list of "examples" retrieved via the api
class ExampleList extends React.Component {
    state = {
      loading: true,
      examples: null
    }

    async componentDidMount () {
      const examples = await getExamples()
      this.setState({ examples: examples, loading: false })
    }

    render () {
      return this.state.loading ? <p>TODO: loading indicator</p>
        : <div>
          {this.state.examples.map(e => <Example example={e} />)}
        </div>
    }
}

export default ExampleList
