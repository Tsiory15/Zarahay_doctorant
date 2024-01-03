import React from 'react'
import {MdMessage} from 'react-icons/md'
import './discussion.css'

const Discussion = () => {
  const nav = () => {
    window.location.href = 'https://explore.zoom.us/fr/products/meetings/'
  }
  return (
    <div>
        <div className='discussion_btn' onClick={nav}>
            <MdMessage></MdMessage>
        </div>
    </div>
  )
}

export default Discussion