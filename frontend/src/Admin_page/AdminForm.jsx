import React, {useState } from 'react'
import axios from 'axios'
import {useNavigate,Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import './adminForm.css'
const AdminForm = () => {
    const [adminMail,setadminMail] = useState('')
    const [adminPass,setadminPass] = useState('')
    const navigate = useNavigate()
    const onSubmit = async (e) => {
        e.preventDefault();
        if(adminMail.length === 0 || adminPass.length === 0){
            Swal.fire({
                title:"Veuillez remplir tous les champs",
                timer:2000,
                showConfirmButton:false,
                position:"top"
            })
        }else{
           await axios.post("http://localhost:8081/logadmin",{adminMail,adminPass})
        .then(res => {
            if(res.status === 200){
                console.log(res.data)
                navigate('/Dashboard');
            }else{
                Swal.fire({
                    title:"Mot de passe ou e-mail incorrect",
                    timer:2000,
                    showConfirmButton:false,
                    position:"top"
                })
                console.log("Unknown user")
            }
        })
        .catch(err => console.log(err))
        }
    }
    return (
        <div>
            <div className="admin_main_container">
            <form onSubmit={onSubmit} className="admin_container">
                <span>Connect as an Admin</span>
                <input 
                    type="email" 
                    className="mail_admin"
                    placeholder="E-mail"
                    onChange={e => setadminMail(e.target.value)}
                />
                <input 
                    type="password" 
                    className="pass_admin"
                    placeholder="Password"
                    onChange={e => setadminPass(e.target.value)}
                    />
                <button className="admin_button">Submit</button>
                <Link to={'/login'}>Retour</Link>
            </form>
            </div>
        </div>
    )
}

export default AdminForm
