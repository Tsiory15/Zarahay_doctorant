import React, { useState } from 'react'
import './forgotpass.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Forgotpass = () => {
    const nav = useNavigate()
    const [isEmailFocused,setIsEmailFocused] = useState(false)
    const [mail,setMail] = useState('')
    const [validation,setValidation] = useState('')
    const sendValidation = () => {
        if(mail.length === 0){
            Swal.fire({
                toast:true,
                title:"Veuillez d'abord remplir votre adresse e-mail",
                showConfirmButton:false,
                timer:2000,
                position:"top"
            })
        }else{
        axios.post('http://localhost:8081/sendValidation',{mail})
        .then(res => {console.log(res)
            Swal.fire({
                toast:true,
                title:"Votre code de validation a été envoyé a l'adresse mail mentionné",
                showConfirmButton:false,
                timer:5000,
                position:"top"
            })
        })
        .catch(err => console.log(err))
    }}
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(mail.length === 0 || validation.length === 0){
            Swal.fire({
                toast:true,
                text:"Veuillez remplir tous les champs",
                showConfirmButton:false,
                timer:2000,
                position:"top"
            })
        }else{
            axios.post('http://localhost:8081/forgotpassword',{mail,validation})
            .then(res => {
                if(res.status === 201){
                    setTimeout(
                        nav('/ChangePassword'),2000
                    )
                }else{
                    Swal.fire({
                        text:'Non authoriser',
                        toast:true,
                        position:'top',
                        timer:2000,
                        showConfirmButton:false
                    })
                }
            })
        }
    }
  return (
    <div>
        <div className='forgot_main_container'>
            <div className='forgot_form_container'>
            <p>Récupérez l'accès à votre compte en toute sécurité. Entrez votre adresse e-mail ci-dessous, et nous vous enverrons les instructions nécessaires pour réinitialiser votre mot de passe.</p>
            <div className={`form-group ${isEmailFocused || mail ? 'focused' : ''}`}>
                <label>Adresse E-mail</label>
                    <input 
                            type="email" 
                            className="mail_create" 
                            onChange={e => setMail(e.target.value)}
                            onFocus={() => setIsEmailFocused(true)}
                            onBlur={() => setIsEmailFocused(false)}
                        />
                    </div>
                <div>
                    <input 
                        type="text" 
                        className="validation_create" 
                        placeholder="Code de validation"
                        onChange={e => setValidation(e.target.value)}/>
                    <button className='validation_btn' onClick={sendValidation}>Envoyer</button>
                </div>
                <button onClick={onSubmitHandler} className="create_button">Valider</button>
            </div>
        </div>
    </div>
  )
}

export default Forgotpass