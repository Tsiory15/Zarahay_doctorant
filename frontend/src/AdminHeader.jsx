import React from 'react'
import {Link} from 'react-router-dom'
import "./AdminHeader.css"

const AdminHeader = () => {
    return (
        <div>
            <div className="admin_menu">
                    <ul className="list_menu">
                        <li><Link to="/Utilisateur">Utilisateur</Link></li>
                        <li><Link to="/InsertFormation">Formation</Link></li>
                        <li><Link to="/module">Modules</Link></li>
                        <li><Link to="/Validation">Validation</Link></li>
                        {/* <li><Link>Discussion</Link></li> */}
                    </ul>
                </div>
        </div>
    )
}

export default AdminHeader
