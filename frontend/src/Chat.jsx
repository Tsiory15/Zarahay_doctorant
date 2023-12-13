import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './chat.css'

const Chat = () => {
    const [contenu,setContenu] = useState('')
    const [nom,setNom] = useState('')
    axios.defaults.withCredentials = true;
    //Get username
    useEffect(() => {
        axios.get('http://localhost:8081/auth')
        .then(res => {
            setNom(res.data.name)
        })
        .catch(err => console.log(err))
    },[])
    //Send message
    const sendMessage = () => {
        axios.post(`http://localhost:8081/sendmessage`,{contenu,nom})
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
    }
  return (
    <div>
        <div className='chat_global_container'>
            <div className='message_container'>
                <p>
                    Show message here
                </p>
            <div className='form_container'>
            <input type="text" onChange={e => setContenu(e.target.value)}/>
            <button onClick={sendMessage}>Envoyer</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Chat