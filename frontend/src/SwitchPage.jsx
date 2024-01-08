import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { HiOutlineSwitchHorizontal } from "react-icons/hi"
import { useNavigate } from 'react-router-dom'

const SwitchPage = () => {
  const admin = Cookies.get('admin_token')
  const nav = useNavigate()
  const [change,setChange] = useState(false)
  const navigate = () => {
    if(change === true){
      nav('/Utilisateur')
      setChange(!change)
    }else{
      nav('/')
      setChange(!change)
    }
  }
  return (
    <div>
        {admin &&
            <div onClick={navigate} className='discussion_btn'>
            <HiOutlineSwitchHorizontal/>
        </div>
        }
    </div>
  )
}

export default SwitchPage