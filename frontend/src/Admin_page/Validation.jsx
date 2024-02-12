import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import PagenotFound from '../PagenotFound'
import { FaCheck } from "react-icons/fa6";
import ms from 'ms'
const Validation = () => {
    const [inscrit,setInscrit] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/getinscrit')
        .then(res => setInscrit(res.data))
        .catch(err => console.log(err))
    }, [])
    const Validate = (id_inscription,délai) => {
        const currentDate = Date.now()
        const datefin = currentDate + ms(délai)
        axios.post('http://localhost:8081/validate',{id_inscription,datefin})
        .then(res => {
            window.location.reload(true)
            console.log(res)})
        .catch(err => console.log(err))
    }
    const admin_token = Cookies.get('admin_token')
    if(!admin_token){
        return <PagenotFound/>
    }
    return (
        <div>
            <div className="table_container">
                <h1>Listes des utilisateurs inscrites</h1>
            <table className="table">
                <thead>
                    <tr className="thead">
                        <th>Nom</th>
                        <th>Formation</th>
                        <th>Date de fin de formation</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        inscrit.map((value,index) => {
                            return <tr key={index} className="tbody">
                                <td>{value.nom}</td>
                                <td>{value.id_formation}</td>
                                <td>{value.datefin}</td>
                                <td>{value.status}</td>
                                <td><button className='valid' onClick={() => Validate(value.id_inscription,value.délai)}><FaCheck/></button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            </div>
            </div>
    )
}

export default Validation