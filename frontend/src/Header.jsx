import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {FaBars} from 'react-icons/fa'
import './header.css'
import axios from 'axios'
// import Cookies from 'js-cookie'
 // import {GrLogout} from 'react-icons/gr'
// import {AiFillCaretDown} from 'react-icons/ai'

const Header = () => {
    axios.defaults.withCredentials = true;
    const [show, setShow] = useState(true)
    // const [name,setName] = useState('')
    // const [message,setMessage] = useState('')
    const [auth,setAuth] = useState(false)
    const navigate = useNavigate();
    const handleclick = () => {
        navigate('/login')
    }
    const handlelogout = () => {
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
    }

    

    useEffect(() => {
      axios.get('http://localhost:8081/auth')
      .then(res => {
        if(res.data.Status === "Success"){
            setAuth(true)
            // setName(res.data.name);
            // console.log(res.data.name)
        }else{
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
                <FaBars className="menu_icons" onClick={() => setShow(!show)}></FaBars>
                    <ul className={show ? "hide":"show"}>
                        <li className="acceuil"><Link to="/">Acceuil</Link></li>
                        {auth ? <li className="formation"><Link to={"/Formation"}>Formation</Link></li> : <></>}
                        <li className="contact"><Link>Contact</Link></li>
                        <li><Link>FAQ</Link></li>
                        {
                            auth ? (<button onClick={handlelogout} className="log">Se déconnecter</button>) : 
                            (
                                <>
                                {/* <li className='status'>
                                    <Link className='nom'>{name}</Link>
                                    <GrLogout className='logout'/></li> */}
                                    <button onClick={handleclick} className="log">Se Connecter</button>
                                    </>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header
