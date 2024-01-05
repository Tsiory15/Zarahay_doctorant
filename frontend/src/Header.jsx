import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {FaBars} from 'react-icons/fa'
import './header.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import { TbLogout } from "react-icons/tb";
import { LuUserCircle2 } from "react-icons/lu";
import Swal from 'sweetalert2'
// import {AiFillCaretDown} from 'react-icons/ai'

const Header = () => {
    axios.defaults.withCredentials = true;
    const admin = Cookies.get('admin_token')
    const [show, setShow] = useState(true)
    const [name,setName] = useState('')
    // const [message,setMessage] = useState('')
    const [auth,setAuth] = useState(false)
    const navigate = useNavigate();
    const handleclick = () => {
        navigate('/login')
    }
    const handlelogout = () => {
        Swal.fire({
            title: 'Logout?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
        if (result.isConfirmed) {
     axios.get('http://localhost:8081/logout')
     .then(res => {
        if(res.data.Status === "Success")
        {
            window.location.reload(true)
        }else{
            console.log("error when trying to logout")
        }
     })
     .catch(err => console.log(err))   
        }}
        )}

    

    useEffect(() => {
      axios.get('http://localhost:8081/auth')
      .then(res => {
        if(res.data.Status === "Success"){
            setAuth(true)
            setName(res.data.name);
            // console.log(res.data.name)
        }else{
            setName('Admin')
            // setMessage(res.data.Message);
        }
      })
      .catch(err => console.log(err))
    },[])
    return (
        <div className="global_container">  
            <div className="main_container">
                <div className="logo">
                <p>ZARAHAY<br/><span>Doctorant</span></p>
                </div>
                <div className="menu_main_container">
                    <ul className={show ? "hide":"show"}>
                        <li className="acceuil"><Link to="/">Acceuil</Link></li>
                        {auth ? <li className="formation"><Link to={"/Formation"}>Formation</Link></li> : <></>}
                        {admin ? <li className="formation"><Link to={"/Formation"}>Formation</Link></li> : <></>}
                        <li className="contact"><Link>Contact</Link></li>
                        <li><Link>FAQ</Link></li>
                    </ul>
                </div>
                <div className='logging_main_container'>
                {
                            auth || admin ? (
                            <>
                            <LuUserCircle2 className='user_icon'/>
                            <p className='connected_user'>{name}</p>
                            {admin ? <></> :
                                <TbLogout onClick={handlelogout} className='logout' title='Se déconnecter?'/>
                            }
                            </>
                            ) : 
                            (
                                <button onClick={handleclick} className="log">Se Connecter</button>
                            )
                        }
                        <FaBars className="menu_icons" onClick={() => setShow(!show)}></FaBars>
                </div>
            </div>
        </div>
    )
}

export default Header
