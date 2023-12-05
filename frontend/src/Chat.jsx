import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './chat.css'

const Chat = () => {
    const [userList,setUserList] = useState([])
    const [message,setMessage] = useState([])
    const [contenu,setContenu] = useState('')
    const [nom,setNom] = useState('')
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8081/getall')
        .then(res => {setUserList(res.data)})
        .catch(err => console.log(err))
        axios.get('http://localhost:8081/auth')
        .then(res => {
            setNom(res.data.name)
        })
        .catch(err => console.log(err))
        axios.get('http://localhost:8081/getallmessage')
        .then(res => setMessage(res.data))
        .catch(err => console.log(err))
    },[])
    // const showdata = (id) => {
    //     axios.get(`http://localhost:8081/getmessage/${id}`)
    //     .then(res => {setMessage(res.data)})
    //     .catch(err => console.log(err))
    // }
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
        <div className='chat_main_container'>
            {userList.map(value => {
                return (
                    <div key={value.id} className='chat_container'>
                        {value.nom}
                    </div>
                )
            })}
        </div>
        <div className='section'>
            <div className='message_container'>
                {message.map((value,index) => {
                    return(
                        <>
                        <div>
                        <p>{value.Nom}</p>
                        <div>
                            {value.contenu}
                        </div>
                        </div>
                        </>
                    )
                })}
            </div>
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