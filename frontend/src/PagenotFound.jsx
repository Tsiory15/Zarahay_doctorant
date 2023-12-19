import React from 'react'
import './pageNotFound.css'
import { useNavigate } from 'react-router-dom'

const PagenotFound = () => {
    const nav = useNavigate()
  return (
    <div>
        <div className='not_found_image'>
            <button className='gotohome' onClick={() => nav('/')}>
                Revenir a l'acceuil
            </button>
        </div>
    </div>
  )
}

export default PagenotFound