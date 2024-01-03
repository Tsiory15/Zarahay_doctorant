import axios from 'axios'
import React, { useState } from 'react'
import "./create.css"
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

const Create = () => {
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isNameFocused, setNameFocused] = useState(false);
    const [mail,setMail] = useState('')
    const [mdp,setMdp] = useState('')
    const [name,setName] = useState('')
    const [validation,setValidation] = useState('')
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(mail.length === 0 || mdp.length === 0 || name.length === 0 || validation.length === 0){
            Swal.fire({
                toast:true,
                text:"Veuillez remplir tous les champs",
                showConfirmButton:false,
                timer:2000,
                position:"top"
            })
        }else{
        axios.post('http://localhost:8081/user',{name,mail,mdp,formattedDate,validation})
        .then(res => {
            if(res.status === 201){
                Swal.fire({
                    toast:true,
                    text:"Compte mail déja existant veuillez en choisir un autre",
                    showConfirmButton:false,
                    timer:2000,
                    position:"top"
                })
                console.log(res)
            }else{
                if(res.status === 202){
                    Swal.fire({
                        toast:true,
                        text:"Code de validation Incorrecte",
                        showConfirmButton:false,
                        timer:2000,
                        position:"top"
                    })
                }else{
                console.log(res)
                Swal.fire({
                    toast:true,
                    title:"Account creating successfully failed",
                    showConfirmButton:false,
                    timer:2000,
                    position:"top"
                })}
            }
        })
        .catch(err => console.log(err));
    }}
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
    return (
        <div>
            <div className="create_global_container">
                <div className='create_main_container'>
                    <div>
                        <div className="create_container">
                            <span>CREER UN COMPTE</span>
                            <div className={`form-group ${isNameFocused || name ? 'focused' : ''}`}>
                            <label>Nom d'utilisateur</label>
                            <input 
                                type="text" 
                                className="name_create" 
                                onChange={e => setName(e.target.value)}
                                onFocus={() => setNameFocused(true)}
                                onBlur={() => setNameFocused(false)}
                                />
                            </div>
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
                            <div className={`form-group ${isPasswordFocused || mdp ? 'focused' : ''}`}>
                            <label>Mot de passe</label>
                            <input 
                                type="password" 
                                className="pass_create" 
                                onChange={e => setMdp(e.target.value)}
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setIsPasswordFocused(false)}
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
                            <button onClick={onSubmitHandler} className="create_button">Submit</button>
                            <Link to="/login">Se connecter</Link>
                        </div>
                    </div>
                    <div className='bg_image_container'>
                        <div className='bg_image'>
                        </div>
                    </div>
            </div>
            </div>
        </div>
    )
}

export default Create
