import React, {useState } from 'react'
import axios from 'axios'
import {useNavigate,Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import './adminForm.css'
import image from '../../src/user.png'
import retour from '../../src/retour.png'
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
                navigate('/Utilisateur');
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
        
        <div className='body'>
            <div className='tout'>
            <center><img src={image} alt='' className='image'/></center>
            
            <div className="admin_main_container" >
                <form onSubmit={onSubmit} className="admin_container">
                <span className='admin'>Connect as an Admin</span>
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
                <center><button className="admin_button">Submit</button></center>
                <Link to={'/login'} id='lien'>
                 <div className='footer'>
                    <img src={retour} alt=""  className='retour'/>
                    <p id='p'>retour</p>
                 </div>
                 </Link>
            </form>
            </div>
        </div>
        </div>
    )
}

export default AdminForm
