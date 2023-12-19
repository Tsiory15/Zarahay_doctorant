import React from 'react'
import {Link} from 'react-router-dom'
import "./AdminHeader.css"
import {LuUserCircle2} from 'react-icons/lu'
import axios from 'axios'

const AdminHeader = () => {
    const logout = () => {
        axios.get('http://localhost:8081/logoutasanadmin')
        .then(res => window.location.reload(true))
        .catch(err => console.log(err))
    }
    return (
        <div>
            <div className="admin_menu">
                    <ul className="list_menu">
                        <li><LuUserCircle2 className='user_icon'/></li>
                        <li><Link to="/Utilisateur">Utilisateur</Link></li>
                        <li><Link to="/InsertFormation">Formation</Link></li>
                        <li><Link to="/module">Modules</Link></li>
                        <li><Link to="/Validation">Validation</Link></li>
                        <li><Link to='https://explore.zoom.us/fr/products/meetings/'>Discussion</Link></li>
                        <li><button className='logout_admin' onClick={logout}>Deconnection</button></li>
                    </ul>
                </div>
        </div>
    )
}

export default AdminHeader
