import axios from 'axios'
import React, { useState } from 'react'
import "./create.css"
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

const Create = () => {
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
                            <span>Sign up</span>
                            <input 
                                type="text" 
                                className="name_create" 
                                placeholder="Name"
                                onChange={e => setName(e.target.value)}/>
                            <input 
                                type="email" 
                                className="mail_create" 
                                placeholder="E-mail"
                                onChange={e => setMail(e.target.value)}/>
                            <input 
                                type="password" 
                                className="pass_create" 
                                placeholder="Password"
                                onChange={e => setMdp(e.target.value)}/>
                                <div>
                                    <input 
                                    type="text" 
                                    className="validation_create" 
                                    placeholder="Code de validation"
                                    onChange={e => setValidation(e.target.value)}/>
                                    <button className='validation_btn' onClick={sendValidation}>Envoyer</button>
                                </div>
                            <button onClick={onSubmitHandler} className="create_button">Submit</button>
                            <Link to="/login">Sign in</Link>
                        </div>
                    </div>
                    <div>

                    </div>
            </div>
            </div>
        </div>
    )
}

export default Create
