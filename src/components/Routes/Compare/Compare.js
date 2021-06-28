import React from 'react'
import { Link } from 'react-router-dom'

const Compare = () => {
    return (
        <div>
            <Link to="/products">{`<-- Zurück`}</Link>
            <h1>Compare Products here</h1>
        </div>
    )
}

export default Compare
