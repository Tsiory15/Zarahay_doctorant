import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const Changepassword = () => {
    axios.defaults.withCredentials = true;
    const [isPassFocused,setIsPassFocused] = useState(false)
    const [isCheckFocused,setIsCheckFocused] = useState(false)
    const [mail,setMail] = useState('')
    const [pass,setPass] = useState('')
    const [check,setCheck] = useState('')
    useEffect(() => {
        axios.get('http://localhost:8081/getmail')
        .then(res => {
            if(res.data.Status === "Success"){
                setMail(res.data.mail)
            }else{
                console.log('an error occured')
            }
        })
        .catch(err => console.log(err))
    })
    const changepass = () => {
        if(pass !== check){
            Swal.fire({
                text:'Mot de passe et confirmation différent',
                toast:true,
                position:'top',
                showConfirmButton:false
            })
        }else{
        axios.post('http://localhost:8081/resetpassword',{mail,pass})
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }}
  return (
    <div>
        <div className='forgot_main_container'>
            <div className='forgot_form_container'>
    <div className={`form-group ${isPassFocused || pass ? 'focused' : ''}`}>
                            <label>Nouveau mot de passe</label>
                            <input 
                                type="password" 
                                className="name_create" 
                                onChange={e => setPass(e.target.value)}
                                onFocus={() => setIsPassFocused(true)}
                                onBlur={() => setIsPassFocused(false)}
                                />
                            </div>
                            <div className={`form-group ${isCheckFocused || check ? 'focused' : ''}`}>
                            <label>Confirmer votre mot de passe</label>
                            <input 
                                type="password" 
                                className="mail_create" 
                                onChange={e => setCheck(e.target.value)}
                                onFocus={() => setIsCheckFocused(true)}
                                onBlur={() => setIsCheckFocused(false)}
                                />
                            </div>
                            <button onClick={changepass} className="create_button">Changer</button>
                    </div>
            </div>
    </div>
  )
}

export default Changepassword