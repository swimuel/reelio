import React from 'react'

// "dumb" component that displays a single "example" entity
const Example = ({ example }) => (
    <div>
        <h1>{example.title}</h1>
        <p>{example.content}</p>
    </div>
)

export default Example