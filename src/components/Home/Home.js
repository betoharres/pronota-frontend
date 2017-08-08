import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

export default function Home (props) {
  return (
    <div className='container'>
      <Link to="/register">
        <strong>{'Registrar'}</strong>
      </Link>
      <br/>
      <Link to="/login">
        {'Entrar'}
      </Link>
    </div>
  )
}
