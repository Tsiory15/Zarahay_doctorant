import React from 'react'
import './nofound.css'
import { useNavigate } from 'react-router-dom'

const NoFound = () => {
  const navigate = useNavigate()
  return (
    <div>
        <div className='connection_container'>
          <h1>Veuillez vous connecter pour avoir accès a cette section</h1>
            <button className='log_btn' onClick={() => {navigate('/login')}}>Se connecter</button>
        </div>
    </div>
  )
}

export default NoFound