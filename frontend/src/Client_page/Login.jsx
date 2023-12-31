import React, {useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import "./acceuil.css"
import Swal from 'sweetalert2'

const Login = () => {
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const onSubmit = async (e) => {
        e.preventDefault();
        if(email.length === 0 || pass.length === 0){
            Swal.fire({
                text:"Veuillez remplir tous les champs",
                timer:2000,
                showConfirmButton:false,
                position:"top"
            })
        }else{
           await axios.post("http://localhost:8081/Acceuil",{email,pass})
        .then(res => {
            if(res.data.Status === "Success"){
                console.log(res.data)
                navigate('/');
            }else{
                Swal.fire({
                    text:"Mot de passe ou e-mail incorrect",
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
            
            <div className='login_global_container'>
                <div className="login_main_container">
                <div className='admin_part_container'>
                    <div className='background_image'>
                <Link className='adm' to="/AdminForm">Administrateur</Link>
                    </div>
                </div>
                <div className='container_login_container'>
                    <form onSubmit={onSubmit} className="login_container">
                    <h1>SE CONNECTER</h1>
                    <div className={`form-group ${isEmailFocused || email ? 'focused' : ''}`}>
                    <label>E-mail</label>
                    <input 
                        id='mail'
                        type="email" 
                        className="mail_login"
                        onChange={e => {setEmail(e.target.value)}}
                        onFocus={() => setIsEmailFocused(true)}
                        onBlur={() => setIsEmailFocused(false)}
                    />
                    </div>
                    <div className={`form-group ${isPasswordFocused || pass ? 'focused' : ''}`}>
                    <label>Mot de passe</label>
                    <input 
                        id='pass'
                        type="password" 
                        className="pass_login"
                        onChange={e => setPass(e.target.value)}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        />
                    </div>
                    <Link to='/ForgotPassword' className='forgotpsw'>Mot de pass oublié ?</Link>
                    <button className="login_button">Connexion</button>
                    <Link className='sign' to="/Create">Créer un compte?</Link>
                </form>
            </div>
            </div>
            </div>
        </div>
    )
}

export default Login
